import {
  addToWishlistService,
  removeFromWishlistService,
  getWishlistService,
} from "../services/wishlist.service.js";
import { successResponse, successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found" },
  ALREADY_IN_WISHLIST: { code: 409, msg: "Product is already in your wishlist" },
  NOT_IN_WISHLIST: { code: 404, msg: "Product is not in your wishlist" },
};

const handleServiceError = createErrorHandler(errorMap);

export const addToWishlist = async (req, res) => {
  try {
    const result = await addToWishlistService(req.user.id, req.body.product_id);
    return successDataResponse(res, "Product added to wishlist", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    await removeFromWishlistService(req.user.id, req.params.productId);
    return successResponse(res, "Product removed from wishlist", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listWishlist = async (req, res) => {
  try {
    const result = await getWishlistService(req.user.id);
    return successDataResponse(res, "Wishlist fetched successfully", { wishlist: result }, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
