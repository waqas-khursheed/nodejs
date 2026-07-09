import Joi from "joi";
import State from "../../../database/models/State.js";
import City from "../../../database/models/City.js";
import Country from "../../../database/models/Country.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  country_id: Joi.number().integer().positive().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30),
  country_id: Joi.number().integer().positive(),
}).min(1);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  country_id: Joi.number().integer().positive(),
});

const router = makeLookupResourceRouter({
  Model: State,
  resourceLabel: "State",
  listKey: "states",
  searchField: "name",
  filterFields: ["country_id"],
  parentChecks: [
    {
      field: "country_id",
      findFn: (id) => Country.findByPk(id),
      errorCode: "COUNTRY_NOT_FOUND",
      errorMsg: "Country does not exist",
    },
  ],
  childBlock: {
    countFn: (id) => City.count({ where: { state_id: id } }),
    errorCode: "HAS_CITIES",
    errorMsg: "Cannot delete state — it still has cities assigned to it",
  },
  include: [{ model: Country, as: "country" }],
  createSchema,
  updateSchema,
  listQuerySchema,
});

export default router;
