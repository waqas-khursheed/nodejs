import Joi from "joi";
import GeoContinent from "../../../database/models/GeoContinent.js";
import GeoCountry from "../../../database/models/GeoCountry.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
}).min(1);

const router = makeLookupResourceRouter({
  Model: GeoContinent,
  resourceLabel: "Continent",
  listKey: "continents",
  searchField: "name",
  childBlock: {
    countFn: (id) => GeoCountry.count({ where: { continent_id: id } }),
    errorCode: "HAS_COUNTRIES",
    errorMsg: "Cannot delete continent — it still has countries assigned to it",
  },
  createSchema,
  updateSchema,
});

export default router;
