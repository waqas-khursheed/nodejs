import CardDetail from "../../../database/models/CardDetail.js";
import Bank from "../../../database/models/Bank.js";
import CardCategory from "../../../database/models/CardCategory.js";
import CardType from "../../../database/models/CardType.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const checkCardDiscount = async (req, res) => {
  try {
    const card = await CardDetail.findOne({
      where: { card_no: req.query.card_no, status: 1 },
      include: [
        { model: Bank, as: "bank" },
        { model: CardCategory, as: "cardCategory" },
        { model: CardType, as: "cardType" },
      ],
    });

    if (!card) {
      return successDataResponse(res, "No discount available for this card", { eligible: false, percentage: 0 }, 200);
    }

    return successDataResponse(
      res,
      "Card discount found",
      { eligible: true, percentage: card.percentage, bank: card.bank, cardCategory: card.cardCategory, cardType: card.cardType },
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
