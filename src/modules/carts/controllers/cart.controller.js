import {
  addToCartService,
  updateCartItemService,
  removeCartItemService,
  getCartService,
  clearCartService,
} from "../services/cart.service.js";
import { successResponse, successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const errorMap = {
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found or unavailable" },
  STOCK_REQUIRED: { code: 422, msg: "This product has variations — stock_id is required" },
  STOCK_NOT_FOUND: { code: 422, msg: "Selected variation does not exist for this product" },
  INSUFFICIENT_STOCK: { code: 409, msg: "Not enough stock available for the requested quantity" },
  CART_ITEM_NOT_FOUND: { code: 404, msg: "Cart item not found" },
};

const handleServiceError = (res, err) => {
  const mapped = errorMap[err.message];
  if (mapped) return errorResponse(res, mapped.msg, mapped.code);

  return errorResponse(
    res,
    process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
    500
  );
};

export const addToCart = async (req, res) => {
  try {
    const result = await addToCartService(req.cartOwner, req.body);
    return successDataResponse(res, "Item added to cart", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const result = await updateCartItemService(req.cartOwner, req.params.id, req.body.quantity);
    return successDataResponse(res, "Cart item updated", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const removeCartItem = async (req, res) => {
  try {
    await removeCartItemService(req.cartOwner, req.params.id);
    return successResponse(res, "Cart item removed", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listCart = async (req, res) => {
  try {
    const result = await getCartService(req.cartOwner);
    return successDataResponse(res, "Cart fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const clearCart = async (req, res) => {
  try {
    await clearCartService(req.cartOwner);
    return successResponse(res, "Cart cleared", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
