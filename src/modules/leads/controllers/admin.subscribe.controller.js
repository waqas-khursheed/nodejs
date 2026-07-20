import { Op } from "sequelize";
import Subscribe from "../../../database/models/Subscribe.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import { successResponse, successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const listSubscribes = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const where = {};
    if (req.query.status !== undefined && req.query.status !== "") where.status = req.query.status;
    if (req.query.search) where.email = { [Op.like]: `%${req.query.search}%` };

    const { count, rows } = await Subscribe.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    return successDataResponse(
      res,
      "Subscribers fetched successfully",
      { subscribers: rows, meta: buildPaginationMeta({ count, page, limit }) },
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

export const toggleSubscribeStatus = async (req, res) => {
  try {
    const row = await Subscribe.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Subscriber not found", 404);

    const newStatus = Number(row.status) === 1 ? 0 : 1;
    await Subscribe.update({ status: newStatus, seen: 1 }, { where: { id: req.params.id } });
    const updated = await Subscribe.findByPk(req.params.id);

    return successDataResponse(res, "Subscriber status updated successfully", updated, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const deleteSubscribe = async (req, res) => {
  try {
    const row = await Subscribe.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Subscriber not found", 404);

    await Subscribe.destroy({ where: { id: req.params.id } });
    return successResponse(res, "Subscriber deleted successfully", 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
