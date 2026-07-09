import Joi from "joi";
import City from "../../../database/models/City.js";
import State from "../../../database/models/State.js";
import ProductCity from "../../../database/models/ProductCity.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  state_id: Joi.number().integer().positive().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30),
  state_id: Joi.number().integer().positive(),
}).min(1);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  state_id: Joi.number().integer().positive(),
});

const router = makeLookupResourceRouter({
  Model: City,
  resourceLabel: "City",
  listKey: "cities",
  searchField: "name",
  filterFields: ["state_id"],
  parentChecks: [
    {
      field: "state_id",
      findFn: (id) => State.findByPk(id),
      errorCode: "STATE_NOT_FOUND",
      errorMsg: "State does not exist",
    },
  ],
  childBlock: {
    countFn: (id) => ProductCity.count({ where: { city_id: id } }),
    errorCode: "HAS_PRODUCTS",
    errorMsg: "Cannot delete city — it still has products assigned to it",
  },
  include: [{ model: State, as: "state" }],
  createSchema,
  updateSchema,
  listQuerySchema,
});

export default router;
