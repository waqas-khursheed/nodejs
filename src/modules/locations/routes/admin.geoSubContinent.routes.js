import Joi from "joi";
import GeoSubContinent from "../../../database/models/GeoSubContinent.js";
import GeoContinent from "../../../database/models/GeoContinent.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  continent_id: Joi.number().integer().positive().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  continent_id: Joi.number().integer().positive(),
}).min(1);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  continent_id: Joi.number().integer().positive(),
});

const router = makeLookupResourceRouter({
  Model: GeoSubContinent,
  resourceLabel: "Sub-continent",
  listKey: "subContinents",
  searchField: "name",
  filterFields: ["continent_id"],
  parentChecks: [
    {
      field: "continent_id",
      findFn: (id) => GeoContinent.findByPk(id),
      errorCode: "CONTINENT_NOT_FOUND",
      errorMsg: "Continent does not exist",
    },
  ],
  include: [{ model: GeoContinent, as: "continent" }],
  createSchema,
  updateSchema,
  listQuerySchema,
});

export default router;
