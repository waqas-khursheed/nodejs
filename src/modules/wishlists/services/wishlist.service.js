import Wishlist from "../../../database/models/Wishlist.js";
import {
  findWishlistItemRepo,
  createWishlistItemRepo,
  deleteWishlistItemRepo,
  findWishlistByUserRepo,
} from "../repositories/wishlist.repository.js";
import Product from "../../../database/models/Product.js";

export const addToWishlistService = async (userId, productId) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  const existing = await findWishlistItemRepo(userId, productId);
  if (existing) throw new Error("ALREADY_IN_WISHLIST");

  const created = await createWishlistItemRepo(userId, productId);
  return await Wishlist.findByPk(created.id);
};

export const removeFromWishlistService = async (userId, productId) => {
  const existing = await findWishlistItemRepo(userId, productId);
  if (!existing) throw new Error("NOT_IN_WISHLIST");

  await deleteWishlistItemRepo(userId, productId);
  return true;
};

export const getWishlistService = async (userId) => {
  return await findWishlistByUserRepo(userId);
};
