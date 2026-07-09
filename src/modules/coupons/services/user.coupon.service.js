import {
  findActiveCouponByCodeRepo,
  findCouponCategoryIdsRepo,
  findUsedCouponRepo,
  findProductCategoryIdsRepo,
} from "../repositories/user.coupon.repository.js";
import { getCartService } from "../../carts/services/cart.service.js";

export const previewCouponService = async (userId, code) => {
  const cart = await getCartService({ user_id: userId });
  if (!cart.items.length) throw new Error("EMPTY_CART");

  const coupon = await findActiveCouponByCodeRepo(code);
  if (!coupon) throw new Error("COUPON_NOT_FOUND");

  const alreadyUsed = await findUsedCouponRepo(userId, coupon.id);
  if (alreadyUsed) throw new Error("COUPON_ALREADY_USED");

  let eligibleSubtotal = 0;

  if (coupon.to_all) {
    eligibleSubtotal = cart.subTotal;
  } else {
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

  const discountAmount = Number(((eligibleSubtotal * coupon.percentage) / 100).toFixed(2));

  return {
    code: coupon.code,
    percentage: coupon.percentage,
    cartSubtotal: cart.subTotal,
    eligibleSubtotal: Number(eligibleSubtotal.toFixed(2)),
    discountAmount,
    newTotal: Number((cart.subTotal - discountAmount).toFixed(2)),
  };
};
