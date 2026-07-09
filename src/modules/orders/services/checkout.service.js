import Product from "../../../database/models/Product.js";
import Stock from "../../../database/models/Stock.js";
import UserReward from "../../../database/models/UserReward.js";
import RewardSetting from "../../../database/models/RewardSetting.js";
import WebSetting from "../../../database/models/WebSetting.js";
import CardDetail from "../../../database/models/CardDetail.js";
import {
  findActiveCouponByCodeRepo,
  findCouponCategoryIdsRepo,
  findUsedCouponRepo,
  createUsedCouponRepo,
  findProductCategoryIdsRepo,
} from "../../coupons/repositories/user.coupon.repository.js";
import { getCartService, clearCartService } from "../../carts/services/cart.service.js";
import {
  createOrderRepo,
  createOrderDetailsRepo,
  createBillingDetailRepo,
  findUserOrderByIdRepo,
  findUserOrdersRepo,
} from "../repositories/user.order.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

const round2 = (n) => Number(n.toFixed(2));

const resolveCouponDiscount = async (userId, code, cart) => {
  if (!code) return { discountAmount: 0, coupon: null };

  const coupon = await findActiveCouponByCodeRepo(code);
  if (!coupon) throw new Error("COUPON_NOT_FOUND");

  const alreadyUsed = await findUsedCouponRepo(userId, coupon.id);
  if (alreadyUsed) throw new Error("COUPON_ALREADY_USED");

  let eligibleSubtotal = cart.subTotal;

  if (!coupon.to_all) {
    const categoryIds = await findCouponCategoryIdsRepo(coupon.id);
    const productIds = cart.items.map((item) => item.product_id);
    const assignments = await findProductCategoryIdsRepo(productIds);
    const eligibleProductIds = new Set(
      assignments.filter((a) => categoryIds.includes(a.category_id)).map((a) => a.product_id)
    );

    eligibleSubtotal = cart.items
      .filter((item) => eligibleProductIds.has(item.product_id))
      .reduce((sum, item) => sum + item.lineTotal, 0);

    if (eligibleSubtotal === 0) throw new Error("COUPON_NOT_APPLICABLE");
  }

  const discountAmount = round2((eligibleSubtotal * coupon.percentage) / 100);
  return { discountAmount, coupon };
};

const resolveCardDiscount = async (card_no, remaining) => {
  if (!card_no) return { discountAmount: 0, card: null };

  const card = await CardDetail.findOne({ where: { card_no, status: 1 } });
  if (!card) return { discountAmount: 0, card: null };

  const discountAmount = round2((remaining * card.percentage) / 100);
  return { discountAmount, card };
};

const resolveRewardsDiscount = async (userId, useReward, remaining) => {
  if (!useReward) return { discountAmount: 0, pointsUsed: 0, userReward: null };

  const userReward = await UserReward.findOne({ where: { user_id: userId } });
  const settings = await RewardSetting.findOne({ order: [["id", "ASC"]] });

  if (!userReward || !settings || userReward.rewards < settings.minimum_points) {
    return { discountAmount: 0, pointsUsed: 0, userReward: null };
  }

  const redeemablePoints = Math.floor(userReward.rewards / settings.points) * settings.points;
  const redeemableValue = (redeemablePoints / settings.points) * settings.equal_to;
  const discountAmount = round2(Math.min(redeemableValue, remaining));
  const pointsUsed = settings.points > 0 ? (discountAmount / settings.equal_to) * settings.points : 0;

  return { discountAmount, pointsUsed, userReward };
};

const resolveShipping = async (subTotalAfterDiscounts) => {
  const webSetting = await WebSetting.findOne({ order: [["id", "ASC"]] });
  if (!webSetting) return 0;

  if (webSetting.min_amount_for_free_delivery && subTotalAfterDiscounts >= webSetting.min_amount_for_free_delivery) {
    return 0;
  }

  return webSetting.shipping_rate || 0;
};

const generateOrderNumber = () => `ORD-${Date.now()}${Math.floor(Math.random() * 1000)}`;

const validateAndDecrementStock = async (cartItems) => {
  for (const item of cartItems) {
    if (item.stock_id) {
      const stock = await Stock.findByPk(item.stock_id);
      if (!stock) throw new Error("STOCK_NOT_FOUND");
      if (stock.stock_qty !== null && stock.stock_qty < item.quantity) {
        throw new Error("INSUFFICIENT_STOCK");
      }
    } else {
      const product = await Product.findByPk(item.product_id);
      if (!product) throw new Error("PRODUCT_NOT_FOUND");
      if (product.quantity !== null && product.quantity < item.quantity) {
        throw new Error("INSUFFICIENT_STOCK");
      }
    }
  }

  for (const item of cartItems) {
    if (item.stock_id) {
      const stock = await Stock.findByPk(item.stock_id);
      if (stock.stock_qty !== null) {
        await Stock.update({ stock_qty: stock.stock_qty - item.quantity }, { where: { id: stock.id } });
      }
    } else {
      const product = await Product.findByPk(item.product_id);
      if (product.quantity !== null) {
        await Product.update(
          { quantity: product.quantity - item.quantity, sold: product.sold + item.quantity },
          { where: { id: product.id } }
        );
      }
    }
  }
};

export const placeOrderService = async (user, data) => {
  const cart = await getCartService({ user_id: user.id });
  if (!cart.items.length) throw new Error("EMPTY_CART");

  const { discountAmount: couponDiscount, coupon } = await resolveCouponDiscount(
    user.id,
    data.coupon_code,
    cart
  );

  let remaining = round2(cart.subTotal - couponDiscount);

  const { discountAmount: cardDiscount, card } = await resolveCardDiscount(data.card_no, remaining);
  remaining = round2(remaining - cardDiscount);

  const { discountAmount: rewardsDiscount, pointsUsed, userReward } = await resolveRewardsDiscount(
    user.id,
    data.use_reward,
    remaining
  );
  remaining = round2(remaining - rewardsDiscount);

  const shipping = await resolveShipping(remaining);
  const grandTotal = round2(remaining + shipping);

  await validateAndDecrementStock(cart.items);

  const order = await createOrderRepo({
    order_number: generateOrderNumber(),
    user_id: user.id,
    user_ip: data.user_ip || "0.0.0.0",
    status: 0,
    pay_method: data.pay_method,
    shipping,
    sub_total: cart.subTotal,
    coupon_discount: couponDiscount || null,
    coupon_title: coupon ? coupon.code : null,
    card_discount: cardDiscount || null,
    card_no: card ? data.card_no : null,
    rewards_discount: rewardsDiscount || 0,
    grand_total: grandTotal,
    type: data.type || null,
    delivery_day: data.delivery_day || null,
    delivery_start_time: data.delivery_start_time || null,
    delivery_end_time: data.delivery_end_time || null,
    payment_status: "pending",
    order_type: 0,
    is_deduction: rewardsDiscount > 0 ? 1 : 0,
    seen: 0,
  });

  const orderDetailRows = [];
  for (const item of cart.items) {
    const stock = item.stock_id ? await Stock.findByPk(item.stock_id) : null;

    orderDetailRows.push({
      order_id: order.id,
      product_id: item.product_id,
      color_id: stock ? stock.color_id : null,
      size_id: item.size_id ?? 0,
      fitting_id: item.fitting_id,
      quantity: item.quantity,
      price: item.unitPrice,
      dis_price: item.unitPrice,
      total: item.lineTotal,
      composite_attribute_key: item.composite_attribute_key,
      date: new Date().toISOString().slice(0, 10),
    });
  }

  await createOrderDetailsRepo(orderDetailRows);

  await createBillingDetailRepo({
    order_id: order.id,
    firstname: data.billing.firstname,
    lastname: data.billing.lastname,
    email: data.billing.email,
    phone: data.billing.phone,
    company: data.billing.company,
    address_1: data.billing.address_1,
    address_2: data.billing.address_2,
    city: data.billing.city,
    postcode: data.billing.postcode,
    country: data.billing.country,
    state: data.billing.state,
  });

  if (coupon) {
    await createUsedCouponRepo(user.id, coupon.id);
  }

  if (rewardsDiscount > 0 && userReward) {
    await UserReward.update(
      { rewards: round2(userReward.rewards - pointsUsed) },
      { where: { id: userReward.id } }
    );
  }

  await clearCartService({ user_id: user.id });

  return await findUserOrderByIdRepo(user.id, order.id);
};

export const getUserOrdersService = async (userId, query) => {
  const { page, limit, offset } = getPagination(query);
  const { count, rows } = await findUserOrdersRepo(userId, { limit, offset });

  return { orders: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getUserOrderByIdService = async (userId, orderId) => {
  const order = await findUserOrderByIdRepo(userId, orderId);
  if (!order) throw new Error("ORDER_NOT_FOUND");
  return order;
};
