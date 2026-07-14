import {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  toggleProductStatusService,
  deleteProductService,
  deleteProductGalleryImageService,
} from "../services/product.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  PRODUCT_ALREADY_EXISTS: { code: 409, msg: "A product with this title already exists" },
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found" },
  FEATURED_IMAGE_REQUIRED: { code: 422, msg: "Featured image is required" },
  BRAND_NOT_FOUND: { code: 422, msg: "Selected brand does not exist" },
  CATEGORY_NOT_FOUND: { code: 422, msg: "One or more selected categories do not exist" },
  GALLERY_IMAGE_NOT_FOUND: { code: 404, msg: "Gallery image not found" },
};

const handleServiceError = createErrorHandler(errorMap);

// Accepts a JSON array string ("[1,2]"), a comma-separated string ("1,2"), or an array.
const normalizeCategoryIds = (value) => {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value.map(Number);
  if (typeof value !== "string" || value.trim() === "") return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(Number);
  } catch {
    // not JSON, fall through to CSV parsing
  }

  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .map(Number);
};

export const createProduct = async (req, res) => {
  try {
    const featured_image = req.files?.featured_image ? req.files.featured_image[0].filename : "";
    const hovered_image = req.files?.hovered_image ? req.files.hovered_image[0].filename : "";
    const gallery = req.files?.gallery ? req.files.gallery.map((f) => f.filename) : [];

    const data = {
      ...req.body,
      category_ids: normalizeCategoryIds(req.body.category_ids),
      featured_image,
      hovered_image,
      gallery,
    };

    const result = await createProductService(data);

    return successDataResponse(res, "Product created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listProducts = async (req, res) => {
  try {
    const result = await getProductsService(req.query);

    return successDataResponse(res, "Products fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const result = await getProductByIdService(req.params.id);

    return successDataResponse(res, "Product fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const featured_image = req.files?.featured_image ? req.files.featured_image[0].filename : undefined;
    const hovered_image = req.files?.hovered_image ? req.files.hovered_image[0].filename : undefined;
    const gallery = req.files?.gallery ? req.files.gallery.map((f) => f.filename) : undefined;

    const data = {
      ...req.body,
      category_ids: normalizeCategoryIds(req.body.category_ids),
    };
    if (featured_image) data.featured_image = featured_image;
    if (hovered_image) data.hovered_image = hovered_image;
    if (gallery) data.gallery = gallery;

    const result = await updateProductService(req.params.id, data);

    return successDataResponse(res, "Product updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const toggleProductStatus = async (req, res) => {
  try {
    const result = await toggleProductStatusService(req.params.id);

    return successDataResponse(res, "Product status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await deleteProductService(req.params.id);

    return successResponse(res, "Product deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteProductGalleryImage = async (req, res) => {
  try {
    await deleteProductGalleryImageService(req.params.galleryId);

    return successResponse(res, "Gallery image deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
