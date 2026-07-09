import Joi from "joi";
import GeoState from "../../../database/models/GeoState.js";
import GeoCountry from "../../../database/models/GeoCountry.js";
import GeoCity from "../../../database/models/GeoCity.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  country_id: Joi.number().integer().positive().required(),
  hasc: Joi.string().trim().max(20).required(),
  order_by: Joi.number().integer(),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  country_id: Joi.number().integer().positive(),
  hasc: Joi.string().trim().max(20),
  order_by: Joi.number().integer(),
}).min(1);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  country_id: Joi.number().integer().positive(),
});

const router = makeLookupResourceRouter({
  Model: GeoState,
  resourceLabel: "Geo state",
  listKey: "geoStates",
  searchField: "name",
  filterFields: ["country_id"],
  parentChecks: [
    {
      field: "country_id",
      findFn: (id) => GeoCountry.findByPk(id),
      errorCode: "COUNTRY_NOT_FOUND",
      errorMsg: "Geo country does not exist",
    },
  ],
  childBlock: {
    countFn: (id) => GeoCity.count({ where: { state_id: id } }),
    errorCode: "HAS_CITIES",
    errorMsg: "Cannot delete state — it still has cities assigned to it",
  },
  include: [{ model: GeoCountry, as: "country" }],
  createSchema,
  updateSchema,
  listQuerySchema,
});

export default router;
