import {
  createCommonPageService,
  getCommonPagesService,
  getCommonPageByIdService,
  updateCommonPageService,
  deleteCommonPageService,
} from "../services/commonPage.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  PAGE_NOT_FOUND: { code: 404, msg: "Page not found" },
  PAGE_ALREADY_EXISTS: { code: 409, msg: "A page with this page_name already exists" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createCommonPage = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const result = await createCommonPageService({ ...req.body, image });
    return successDataResponse(res, "Page created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listCommonPages = async (req, res) => {
  try {
    const result = await getCommonPagesService(req.query);
    return successDataResponse(res, "Pages fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getCommonPage = async (req, res) => {
  try {
    const result = await getCommonPageByIdService(req.params.id);
    return successDataResponse(res, "Page fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateCommonPage = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const data = { ...req.body };
    if (image) data.image = image;

    const result = await updateCommonPageService(req.params.id, data);
    return successDataResponse(res, "Page updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteCommonPage = async (req, res) => {
  try {
    await deleteCommonPageService(req.params.id);
    return successResponse(res, "Page deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
