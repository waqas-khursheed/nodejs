import { findActiveBrandsRepo, findActiveBrandBySlugRepo } from "../repositories/user.brand.repository.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const listBrands = async (req, res) => {
  try {
    const brands = await findActiveBrandsRepo();
    return successDataResponse(res, "Brands fetched successfully", { brands }, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const getBrand = async (req, res) => {
  try {
    const brand = await findActiveBrandBySlugRepo(req.params.slug);
    if (!brand) return errorResponse(res, "Brand not found", 404);

    return successDataResponse(res, "Brand fetched successfully", brand, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
