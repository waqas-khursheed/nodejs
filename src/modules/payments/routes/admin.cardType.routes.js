import Joi from "joi";
import CardType from "../../../database/models/CardType.js";
import CardDetail from "../../../database/models/CardDetail.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  card_type: Joi.string().trim().min(2).max(150).required(),
  status: Joi.number().valid(0, 1).default(0),
});

const updateSchema = Joi.object({
  card_type: Joi.string().trim().min(2).max(150),
  status: Joi.number().valid(0, 1),
}).min(1);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  status: Joi.number().valid(0, 1),
});

const router = makeLookupResourceRouter({
  Model: CardType,
  resourceLabel: "Card type",
  listKey: "cardTypes",
  searchField: "card_type",
  filterFields: ["status"],
  childBlock: {
    countFn: (id) => CardDetail.count({ where: { card_type_id: id } }),
    errorCode: "HAS_CARD_DETAILS",
    errorMsg: "Cannot delete card type — it still has card details assigned to it",
  },
  createSchema,
  updateSchema,
  listQuerySchema,
});

export default router;
