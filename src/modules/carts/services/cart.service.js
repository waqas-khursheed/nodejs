import {
  findCartItemByCompositeRepo,
  createCartItemRepo,
  updateCartItemQuantityRepo,
  findCartItemByIdRepo,
  findCartByOwnerRepo,
  deleteCartItemRepo,
  clearCartRepo,
  findStockByIdForProductRepo,
  findDeviceCartItemsRepo,
  reassignCartItemToUserRepo,
} from "../repositories/cart.repository.js";
import Product from "../../../database/models/Product.js";
import Stock from "../../../database/models/Stock.js";
import { computeUnitPrice } from "../../../shared/utils/pricing.js";

const resolveStockAndValidate = async (product, stock_id, requestedQty) => {
  if (product.is_variation) {
    if (!stock_id) throw new Error("STOCK_REQUIRED");

    const stock = await findStockByIdForProductRepo(stock_id, product.id);
    if (!stock) throw new Error("STOCK_NOT_FOUND");

    if (stock.stock_qty !== null && stock.stock_qty < requestedQty) {
      throw new Error("INSUFFICIENT_STOCK");
    }

    return stock;
  }

  if (product.quantity !== null && product.quantity < requestedQty) {
    throw new Error("INSUFFICIENT_STOCK");
  }

  return null;
};

const belongsToOwner = (cartItem, owner) =>
  owner.user_id ? cartItem.user_id === owner.user_id : cartItem.device_id === owner.device_id;

export const addToCartService = async (owner, { product_id, stock_id, quantity }) => {
  const product = await Product.findByPk(product_id);
  if (!product || product.status !== 1) throw new Error("PRODUCT_NOT_FOUND");

  const stock = await resolveStockAndValidate(product, stock_id, quantity);
  const compositeKey = stock_id || 0;

  const existing = await findCartItemByCompositeRepo(owner, product_id, compositeKey);

  if (existing) {
    const newQty = existing.quantity + quantity;
    await resolveStockAndValidate(product, stock_id, newQty);
    await updateCartItemQuantityRepo(existing.id, newQty);
    return await findCartItemByIdRepo(existing.id);
  }

  const created = await createCartItemRepo({
    user_id: owner.user_id || null,
    device_id: owner.user_id ? null : owner.device_id,
    product_id,
    stock_id: stock_id || null,
    size_id: stock ? stock.size_id : null,
    fitting_id: stock ? stock.fitting_id : null,
    composite_attribute_key: compositeKey,
    quantity,
  });

  return await findCartItemByIdRepo(created.id);
};

export const updateCartItemService = async (owner, cartId, quantity) => {
  const cartItem = await findCartItemByIdRepo(cartId);
  if (!cartItem || !belongsToOwner(cartItem, owner)) throw new Error("CART_ITEM_NOT_FOUND");

  await resolveStockAndValidate(cartItem.product, cartItem.stock_id, quantity);

  await updateCartItemQuantityRepo(cartId, quantity);
  return await findCartItemByIdRepo(cartId);
};

export const removeCartItemService = async (owner, cartId) => {
  const cartItem = await findCartItemByIdRepo(cartId);
  if (!cartItem || !belongsToOwner(cartItem, owner)) throw new Error("CART_ITEM_NOT_FOUND");

  await deleteCartItemRepo(cartId);
  return true;
};

export const getCartService = async (owner) => {
  const items = await findCartByOwnerRepo(owner);

  let subTotal = 0;
  const cart = [];

  for (const item of items) {
    const stock = item.stock_id ? await Stock.findByPk(item.stock_id) : null;
    const unitPrice = computeUnitPrice(item.product, stock);
    const lineTotal = Number((unitPrice * item.quantity).toFixed(2));
    subTotal += lineTotal;

    cart.push({ ...item.toJSON(), unitPrice, lineTotal });
  }

  return { items: cart, subTotal: Number(subTotal.toFixed(2)) };
};

export const clearCartService = async (owner) => {
  await clearCartRepo(owner);
  return true;
};

// Called on login/register when the client was carrying a guest cart
// (X-Device-Id) — folds it into the now-known user's cart instead of losing
// it. Matching lines (same product + variation) merge quantities; everything
// else is simply reassigned to the user.
export const mergeDeviceCartIntoUserService = async (deviceId, userId) => {
  if (!deviceId) return;

  const deviceItems = await findDeviceCartItemsRepo(deviceId);

  for (const item of deviceItems) {
    const existing = await findCartItemByCompositeRepo(
      { user_id: userId },
      item.product_id,
      item.composite_attribute_key
    );

    if (existing) {
      await updateCartItemQuantityRepo(existing.id, existing.quantity + item.quantity);
      await deleteCartItemRepo(item.id);
    } else {
      await reassignCartItemToUserRepo(item.id, userId);
    }
  }
};
