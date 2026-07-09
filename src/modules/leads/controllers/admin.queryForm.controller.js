import QueryForm from "../../../database/models/QueryForm.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import { successResponse, successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const listQueryForms = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const where = {};
    if (req.query.seen !== undefined && req.query.seen !== "") where.seen = req.query.seen;

    const { count, rows } = await QueryForm.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    return successDataResponse(
      res,
      "Query forms fetched successfully",
      { queryForms: rows, meta: buildPaginationMeta({ count, page, limit }) },
      200
    );
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const getQueryForm = async (req, res) => {
  try {
    const row = await QueryForm.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Query form not found", 404);

    return successDataResponse(res, "Query form fetched successfully", row, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const markQueryFormSeen = async (req, res) => {
  try {
    const row = await QueryForm.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Query form not found", 404);

    await QueryForm.update({ seen: 1 }, { where: { id: req.params.id } });
    const updated = await QueryForm.findByPk(req.params.id);

    return successDataResponse(res, "Query form marked as seen", updated, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const deleteQueryForm = async (req, res) => {
  try {
    const row = await QueryForm.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Query form not found", 404);

    await QueryForm.destroy({ where: { id: req.params.id } });
    return successResponse(res, "Query form deleted successfully", 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
