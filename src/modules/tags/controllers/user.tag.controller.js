import { findAllTagsRepo, findTagBySlugRepo } from "../repositories/user.tag.repository.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const listTags = async (req, res) => {
  try {
    const tags = await findAllTagsRepo();
    return successDataResponse(res, "Tags fetched successfully", { tags }, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const getTag = async (req, res) => {
  try {
    const tag = await findTagBySlugRepo(req.params.slug);
    if (!tag) return errorResponse(res, "Tag not found", 404);

    return successDataResponse(res, "Tag fetched successfully", tag, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
