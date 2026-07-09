import Wishlist from "../../../database/models/Wishlist.js";
import Product from "../../../database/models/Product.js";
import Brand from "../../../database/models/Brand.js";

export const findWishlistItemRepo = async (userId, productId) => {
  return await Wishlist.findOne({ where: { user_id: userId, product_id: productId } });
};

export const createWishlistItemRepo = async (userId, productId) => {
  return await Wishlist.create({ user_id: userId, product_id: productId });
};

export const deleteWishlistItemRepo = async (userId, productId) => {
  return await Wishlist.destroy({ where: { user_id: userId, product_id: productId } });
};

export const findWishlistByUserRepo = async (userId) => {
  return await Wishlist.findAll({
    where: { user_id: userId },
    include: [{ model: Product, as: "product", include: [{ model: Brand, as: "brand" }] }],
    order: [["id", "DESC"]],
  });
};
