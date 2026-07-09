import {
  getCategoryTreeService,
  getCategoryBySlugService,
} from "../services/user.category.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const listCategories = async (req, res) => {
  try {
    const result = await getCategoryTreeService();
    return successDataResponse(res, "Categories fetched successfully", { categories: result }, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const getCategory = async (req, res) => {
  try {
    const result = await getCategoryBySlugService(req.params.slug);
    return successDataResponse(res, "Category fetched successfully", result, 200);
  } catch (error) {
    if (error.message === "CATEGORY_NOT_FOUND") {
      return errorResponse(res, "Category not found", 404);
    }
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
