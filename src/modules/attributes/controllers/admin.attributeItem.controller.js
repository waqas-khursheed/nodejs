import {
  createAttributeItemService,
  getAttributeItemsService,
  getAttributeItemByIdService,
  updateAttributeItemService,
  deleteAttributeItemService,
} from "../services/attributeItem.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  ATTRIBUTE_NOT_FOUND: { code: 422, msg: "Selected attribute does not exist" },
  ATTRIBUTE_ITEM_ALREADY_EXISTS: { code: 409, msg: "This item already exists for the selected attribute" },
  ATTRIBUTE_ITEM_NOT_FOUND: { code: 404, msg: "Attribute item not found" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createAttributeItem = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : "";

    const data = { ...req.body, image };

    const result = await createAttributeItemService(data);

    return successDataResponse(res, "Attribute item created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listAttributeItems = async (req, res) => {
  try {
    const result = await getAttributeItemsService(req.query);

    return successDataResponse(res, "Attribute items fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getAttributeItem = async (req, res) => {
  try {
    const result = await getAttributeItemByIdService(req.params.id);

    return successDataResponse(res, "Attribute item fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateAttributeItem = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;

    const data = { ...req.body };
    if (image) data.image = image;

    const result = await updateAttributeItemService(req.params.id, data);

    return successDataResponse(res, "Attribute item updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteAttributeItem = async (req, res) => {
  try {
    await deleteAttributeItemService(req.params.id);

    return successResponse(res, "Attribute item deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
