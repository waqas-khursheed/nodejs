import MobileCard from "../../../database/models/MobileCard.js";
import CardDetail from "../../../database/models/CardDetail.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import { successResponse, successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const listMobileCards = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const where = {};
    if (req.query.card_id) where.card_id = req.query.card_id;

    const { count, rows } = await MobileCard.findAndCountAll({
      where,
      limit,
      offset,
      include: [{ model: CardDetail, as: "card" }],
      order: [["id", "DESC"]],
    });

    return successDataResponse(
      res,
      "Mobile cards fetched successfully",
      { mobileCards: rows, meta: buildPaginationMeta({ count, page, limit }) },
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

export const getMobileCard = async (req, res) => {
  try {
    const row = await MobileCard.findByPk(req.params.id, { include: [{ model: CardDetail, as: "card" }] });
    if (!row) return errorResponse(res, "Mobile card not found", 404);

    return successDataResponse(res, "Mobile card fetched successfully", row, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const deleteMobileCard = async (req, res) => {
  try {
    const row = await MobileCard.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Mobile card not found", 404);

    await MobileCard.destroy({ where: { id: req.params.id } });
    return successResponse(res, "Mobile card deleted successfully", 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
