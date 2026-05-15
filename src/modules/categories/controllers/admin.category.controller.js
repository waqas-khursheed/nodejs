import { createCategoryService } from "../services/category.service.js";
import {successDataResponse, errorResponse} from "../../../shared/responses/apiResponse.js";

export const createCategory = async (req, res) => {
  try {
        const image = req.files?.image ? req.files.image[0].filename : "";
        const icon = req.files?.icon ? req.files.icon[0].filename : "";

        const data = {
            ...req.body,
            image,
            icon,
            };

        const result = await createCategoryService(data);

        return successDataResponse(
            res,
            "Category created successfully",
            result,
            201
        );
    } catch (error) {
        return errorResponse(
        res,
        error.message,
        400
        );
    }
};