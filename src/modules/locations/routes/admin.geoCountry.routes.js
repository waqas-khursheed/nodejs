import Joi from "joi";
import GeoCountry from "../../../database/models/GeoCountry.js";
import GeoContinent from "../../../database/models/GeoContinent.js";
import GeoSubContinent from "../../../database/models/GeoSubContinent.js";
import GeoState from "../../../database/models/GeoState.js";
import GeoCity from "../../../database/models/GeoCity.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  cca2: Joi.string().trim().uppercase().length(2).required(),
  cca3: Joi.string().trim().uppercase().length(3).required(),
  ccn3: Joi.number().integer().required(),
  continent_id: Joi.number().integer().positive().required(),
  sub_continent_id: Joi.number().integer().min(0).default(0),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  cca2: Joi.string().trim().uppercase().length(2),
  cca3: Joi.string().trim().uppercase().length(3),
  ccn3: Joi.number().integer(),
  continent_id: Joi.number().integer().positive(),
  sub_continent_id: Joi.number().integer().min(0),
}).min(1);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  continent_id: Joi.number().integer().positive(),
});

// sub_continent_id of 0 means "no sub-continent assigned" — only validate the FK when > 0
const checkSubContinent = async (id) => (Number(id) === 0 ? true : await GeoSubContinent.findByPk(id));

const router = makeLookupResourceRouter({
  Model: GeoCountry,
  resourceLabel: "Geo country",
  listKey: "geoCountries",
  searchField: "name",
  filterFields: ["continent_id"],
  parentChecks: [
    {
      field: "continent_id",
      findFn: (id) => GeoContinent.findByPk(id),
      errorCode: "CONTINENT_NOT_FOUND",
      errorMsg: "Continent does not exist",
    },
    {
      field: "sub_continent_id",
      findFn: checkSubContinent,
      errorCode: "SUB_CONTINENT_NOT_FOUND",
      errorMsg: "Sub-continent does not exist",
    },
  ],
  childBlock: {
    countFn: async (id) =>
      (await GeoState.count({ where: { country_id: id } })) +
      (await GeoCity.count({ where: { country_id: id } })),
    errorCode: "HAS_CHILDREN",
    errorMsg: "Cannot delete country — it still has states/cities assigned to it",
  },
  include: [{ model: GeoContinent, as: "continent" }],
  createSchema,
  updateSchema,
  listQuerySchema,
});

export default router;
