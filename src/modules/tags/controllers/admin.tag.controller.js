import {
  createTagService,
  getTagsService,
  getTagByIdService,
  updateTagService,
  deleteTagService,
  getProductTagsService,
  syncProductTagsService,
  getMetaTagsService,
  syncMetaTagsService,
} from "../services/tag.service.js";
import { successResponse, successDataResponse } from "../../../shared/responses/apiResponse.js";
import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  TAG_ALREADY_EXISTS: { code: 409, msg: "A tag with this name already exists" },
  TAG_NOT_FOUND: { code: 404, msg: "Tag not found" },
  HAS_PRODUCTS: { code: 409, msg: "Cannot delete a tag that is still assigned to products" },
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createTag = async (req, res) => {
  try {
    const icon = req.files?.icon ? req.files.icon[0].filename : "";
    const og_image = req.files?.og_image ? req.files.og_image[0].filename : "";

    const result = await createTagService({ ...req.body, icon, og_image });

    return successDataResponse(res, "Tag created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listTags = async (req, res) => {
  try {
    const result = await getTagsService(req.query);

    return successDataResponse(res, "Tags fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getTag = async (req, res) => {
  try {
    const result = await getTagByIdService(req.params.id);

    return successDataResponse(res, "Tag fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateTag = async (req, res) => {
  try {
    const icon = req.files?.icon ? req.files.icon[0].filename : undefined;
    const og_image = req.files?.og_image ? req.files.og_image[0].filename : undefined;

    const data = { ...req.body };
    if (icon) data.icon = icon;
    if (og_image) data.og_image = og_image;

    const result = await updateTagService(req.params.id, data);

    return successDataResponse(res, "Tag updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteTag = async (req, res) => {
  try {
    await deleteTagService(req.params.id);

    return successResponse(res, "Tag deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getProductTags = async (req, res) => {
  try {
    const result = await getProductTagsService(req.params.productId);

    return successDataResponse(res, "Product tags fetched successfully", { productTags: result }, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const syncProductTags = async (req, res) => {
  try {
    const result = await syncProductTagsService(req.params.productId, req.body.tag_ids);

    return successDataResponse(res, "Product tags updated successfully", { productTags: result }, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getMetaTags = async (req, res) => {
  try {
    const result = await getMetaTagsService(req.params.id);

    return successDataResponse(res, "Meta tags fetched successfully", { metaTags: result }, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const syncMetaTags = async (req, res) => {
  try {
    const result = await syncMetaTagsService(req.params.id, req.body.meta_tags);

    return successDataResponse(res, "Meta tags updated successfully", { metaTags: result }, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
