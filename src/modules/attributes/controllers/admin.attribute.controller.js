import {
  createAttributeService,
  getAttributesService,
  getAttributeByIdService,
  updateAttributeService,
  deleteAttributeService,
} from "../services/attribute.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  ATTRIBUTE_ALREADY_EXISTS: { code: 409, msg: "An attribute with this title already exists" },
  ATTRIBUTE_NOT_FOUND: { code: 404, msg: "Attribute not found" },
  ATTRIBUTE_HAS_ITEMS: { code: 409, msg: "Cannot delete an attribute that has attribute items" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createAttribute = async (req, res) => {
  try {
    const result = await createAttributeService(req.body);

    return successDataResponse(res, "Attribute created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listAttributes = async (req, res) => {
  try {
    const result = await getAttributesService(req.query);

    return successDataResponse(res, "Attributes fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getAttribute = async (req, res) => {
  try {
    const result = await getAttributeByIdService(req.params.id);

    return successDataResponse(res, "Attribute fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateAttribute = async (req, res) => {
  try {
    const result = await updateAttributeService(req.params.id, req.body);

    return successDataResponse(res, "Attribute updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteAttribute = async (req, res) => {
  try {
    await deleteAttributeService(req.params.id);

    return successResponse(res, "Attribute deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
