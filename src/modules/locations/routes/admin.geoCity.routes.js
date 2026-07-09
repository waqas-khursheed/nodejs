import Joi from "joi";
import GeoCity from "../../../database/models/GeoCity.js";
import GeoCountry from "../../../database/models/GeoCountry.js";
import GeoState from "../../../database/models/GeoState.js";
import GeoZone from "../../../database/models/GeoZone.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  country_id: Joi.number().integer().positive().required(),
  state_id: Joi.number().integer().positive().required(),
  zone_id: Joi.number().integer().min(0).default(0),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  country_id: Joi.number().integer().positive(),
  state_id: Joi.number().integer().positive(),
  zone_id: Joi.number().integer().min(0),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).max(180),
}).min(1);

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  country_id: Joi.number().integer().positive(),
  state_id: Joi.number().integer().positive(),
});

// zone_id of 0 means "no zone assigned" — only validate the FK when > 0
const checkZone = async (id) => (Number(id) === 0 ? true : await GeoZone.findByPk(id));

const router = makeLookupResourceRouter({
  Model: GeoCity,
  resourceLabel: "Geo city",
  listKey: "geoCities",
  searchField: "name",
  filterFields: ["country_id", "state_id"],
  parentChecks: [
    {
      field: "country_id",
      findFn: (id) => GeoCountry.findByPk(id),
      errorCode: "COUNTRY_NOT_FOUND",
      errorMsg: "Geo country does not exist",
    },
    {
      field: "state_id",
      findFn: (id) => GeoState.findByPk(id),
      errorCode: "STATE_NOT_FOUND",
      errorMsg: "Geo state does not exist",
    },
    {
      field: "zone_id",
      findFn: checkZone,
      errorCode: "ZONE_NOT_FOUND",
      errorMsg: "Zone does not exist",
    },
  ],
  include: [
    { model: GeoCountry, as: "country" },
    { model: GeoState, as: "state" },
  ],
  createSchema,
  updateSchema,
  listQuerySchema,
});

export default router;
