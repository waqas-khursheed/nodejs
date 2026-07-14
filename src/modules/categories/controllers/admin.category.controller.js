import {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  toggleCategoryStatusService,
  deleteCategoryService,
} from "../services/category.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  CATEGORY_ALREADY_EXISTS: { code: 409, msg: "A category with this title already exists" },
  CATEGORY_NOT_FOUND: { code: 404, msg: "Category not found" },
  PARENT_CATEGORY_NOT_FOUND: { code: 422, msg: "Selected parent category does not exist" },
  CATEGORY_CANNOT_BE_OWN_PARENT: { code: 422, msg: "A category cannot be its own parent" },
  CATEGORY_HAS_CHILDREN: { code: 409, msg: "Cannot delete a category that has subcategories" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createCategory = async (req, res) => {
  try {
    const image = req.files?.image ? req.files.image[0].filename : "";
    const icon = req.files?.icon ? req.files.icon[0].filename : "";

    const data = { ...req.body, image, icon };

    const result = await createCategoryService(data);

    return successDataResponse(res, "Category created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listCategories = async (req, res) => {
  try {
    const result = await getCategoriesService(req.query);

    return successDataResponse(res, "Categories fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getCategory = async (req, res) => {
  try {
    const result = await getCategoryByIdService(req.params.id);

    return successDataResponse(res, "Category fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const image = req.files?.image ? req.files.image[0].filename : undefined;
    const icon = req.files?.icon ? req.files.icon[0].filename : undefined;

    const data = { ...req.body };
    if (image) data.image = image;
    if (icon) data.icon = icon;

    const result = await updateCategoryService(req.params.id, data);

    return successDataResponse(res, "Category updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const toggleCategoryStatus = async (req, res) => {
  try {
    const result = await toggleCategoryStatusService(req.params.id);

    return successDataResponse(res, "Category status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await deleteCategoryService(req.params.id);

    return successResponse(res, "Category deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
