import {
  createSlideService,
  getSlidesService,
  getSlideByIdService,
  updateSlideService,
  toggleSlideStatusService,
  deleteSlideService,
} from "../services/slide.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  SLIDE_NOT_FOUND: { code: 404, msg: "Slide not found" },
  IMAGE_REQUIRED: { code: 422, msg: "Image is required" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createSlide = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : "";
    const result = await createSlideService({ ...req.body, image });

    return successDataResponse(res, "Slide created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listSlides = async (req, res) => {
  try {
    const result = await getSlidesService(req.query);

    return successDataResponse(res, "Slides fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getSlide = async (req, res) => {
  try {
    const result = await getSlideByIdService(req.params.id);

    return successDataResponse(res, "Slide fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateSlide = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : undefined;
    const data = { ...req.body };
    if (image) data.image = image;

    const result = await updateSlideService(req.params.id, data);

    return successDataResponse(res, "Slide updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const toggleSlideStatus = async (req, res) => {
  try {
    const result = await toggleSlideStatusService(req.params.id);

    return successDataResponse(res, "Slide status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteSlide = async (req, res) => {
  try {
    await deleteSlideService(req.params.id);

    return successResponse(res, "Slide deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
