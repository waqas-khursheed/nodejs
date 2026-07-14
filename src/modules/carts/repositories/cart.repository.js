import Cart from "../../../database/models/Cart.js";
import Product from "../../../database/models/Product.js";
import Stock from "../../../database/models/Stock.js";
import Brand from "../../../database/models/Brand.js";

const detailIncludes = [
  { model: Product, as: "product", include: [{ model: Brand, as: "brand" }] },
];

// owner is either { user_id } (logged-in) or { device_id } (guest)
const ownerWhere = (owner) =>
  owner.user_id ? { user_id: owner.user_id } : { device_id: owner.device_id, user_id: null };

export const findCartItemByCompositeRepo = async (owner, productId, compositeKey) => {
  return await Cart.findOne({
    where: { ...ownerWhere(owner), product_id: productId, composite_attribute_key: compositeKey },
  });
};

export const createCartItemRepo = async (data) => {
  return await Cart.create(data);
};

export const updateCartItemQuantityRepo = async (id, quantity) => {
  await Cart.update({ quantity }, { where: { id } });
  return await Cart.findByPk(id);
};

export const findCartItemByIdRepo = async (id) => {
  return await Cart.findByPk(id, { include: detailIncludes });
};

export const findCartByOwnerRepo = async (owner) => {
  return await Cart.findAll({
    where: ownerWhere(owner),
    include: detailIncludes,
    order: [["id", "DESC"]],
  });
};

export const deleteCartItemRepo = async (id) => {
  return await Cart.destroy({ where: { id } });
};

export const clearCartRepo = async (owner, options = {}) => {
  return await Cart.destroy({ where: ownerWhere(owner), ...options });
};

export const findStockByIdForProductRepo = async (stockId, productId) => {
  return await Stock.findOne({ where: { id: stockId, product_id: productId } });
};

export const findDeviceCartItemsRepo = async (deviceId) => {
  return await Cart.findAll({ where: { device_id: deviceId, user_id: null } });
};

export const reassignCartItemToUserRepo = async (id, userId) => {
  await Cart.update({ user_id: userId, device_id: null }, { where: { id } });
};
