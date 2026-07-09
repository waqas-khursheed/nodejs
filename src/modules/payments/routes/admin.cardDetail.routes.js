import Joi from "joi";
import CardDetail from "../../../database/models/CardDetail.js";
import Country from "../../../database/models/Country.js";
import CardCategory from "../../../database/models/CardCategory.js";
import CardType from "../../../database/models/CardType.js";
import Bank from "../../../database/models/Bank.js";
import MobileCard from "../../../database/models/MobileCard.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  card_no: Joi.number().integer().required(),
  country_id: Joi.number().integer().positive().required(),
  card_category_id: Joi.number().integer().positive().required(),
  card_type_id: Joi.number().integer().positive().required(),
  bank_id: Joi.number().integer().positive().required(),
  percentage: Joi.number().min(0).max(100).required(),
  status: Joi.number().valid(0, 1).default(0),
});

const updateSchema = Joi.object({
  card_no: Joi.number().integer(),
  country_id: Joi.number().integer().positive(),
  card_category_id: Joi.number().integer().positive(),
  card_type_id: Joi.number().integer().positive(),
  bank_id: Joi.number().integer().positive(),
  percentage: Joi.number().min(0).max(100),
  status: Joi.number().valid(0, 1),
}).min(1);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.number().valid(0, 1),
  bank_id: Joi.number().integer().positive(),
  card_category_id: Joi.number().integer().positive(),
  card_type_id: Joi.number().integer().positive(),
});

const router = makeLookupResourceRouter({
  Model: CardDetail,
  resourceLabel: "Card detail",
  listKey: "cardDetails",
  filterFields: ["status", "bank_id", "card_category_id", "card_type_id"],
  parentChecks: [
    { field: "country_id", findFn: (id) => Country.findByPk(id), errorCode: "COUNTRY_NOT_FOUND", errorMsg: "Country does not exist" },
    { field: "card_category_id", findFn: (id) => CardCategory.findByPk(id), errorCode: "CATEGORY_NOT_FOUND", errorMsg: "Card category does not exist" },
    { field: "card_type_id", findFn: (id) => CardType.findByPk(id), errorCode: "TYPE_NOT_FOUND", errorMsg: "Card type does not exist" },
    { field: "bank_id", findFn: (id) => Bank.findByPk(id), errorCode: "BANK_NOT_FOUND", errorMsg: "Bank does not exist" },
  ],
  childBlock: {
    countFn: (id) => MobileCard.count({ where: { card_id: id } }),
    errorCode: "HAS_MOBILE_CARDS",
    errorMsg: "Cannot delete card detail — it still has mobile card usage records",
  },
  include: [
    { model: Country, as: "country" },
    { model: CardCategory, as: "cardCategory" },
    { model: CardType, as: "cardType" },
    { model: Bank, as: "bank" },
  ],
  createSchema,
  updateSchema,
  listQuerySchema,
});

export default router;
