import {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService,
  toggleBrandStatusService,
  deleteBrandService,
} from "../services/brand.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  BRAND_ALREADY_EXISTS: { code: 409, msg: "A brand with this title already exists" },
  BRAND_NOT_FOUND: { code: 404, msg: "Brand not found" },
  LOGO_REQUIRED: { code: 422, msg: "Logo image is required" },
  BANNER_REQUIRED: { code: 422, msg: "Banner image is required" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createBrand = async (req, res) => {
  try {
    const logo = req.files?.logo ? req.files.logo[0].filename : "";
    const banner = req.files?.banner ? req.files.banner[0].filename : "";

    const data = { ...req.body, logo, banner };

    const result = await createBrandService(data);

    return successDataResponse(res, "Brand created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listBrands = async (req, res) => {
  try {
    const result = await getBrandsService(req.query);

    return successDataResponse(res, "Brands fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getBrand = async (req, res) => {
  try {
    const result = await getBrandByIdService(req.params.id);

    return successDataResponse(res, "Brand fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateBrand = async (req, res) => {
  try {
    const logo = req.files?.logo ? req.files.logo[0].filename : undefined;
    const banner = req.files?.banner ? req.files.banner[0].filename : undefined;

    const data = { ...req.body };
    if (logo) data.logo = logo;
    if (banner) data.banner = banner;

    const result = await updateBrandService(req.params.id, data);

    return successDataResponse(res, "Brand updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const toggleBrandStatus = async (req, res) => {
  try {
    const result = await toggleBrandStatusService(req.params.id);

    return successDataResponse(res, "Brand status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteBrand = async (req, res) => {
  try {
    await deleteBrandService(req.params.id);

    return successResponse(res, "Brand deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
