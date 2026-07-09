import Joi from "joi";
import GeoZone from "../../../database/models/GeoZone.js";
import GeoCity from "../../../database/models/GeoCity.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  code: Joi.string().trim().max(50).required(),
  name: Joi.string().trim().max(50).required(),
});

const updateSchema = Joi.object({
  code: Joi.string().trim().max(50),
  name: Joi.string().trim().max(50),
}).min(1);

const router = makeLookupResourceRouter({
  Model: GeoZone,
  resourceLabel: "Zone",
  listKey: "zones",
  searchField: "name",
  childBlock: {
    countFn: (id) => GeoCity.count({ where: { zone_id: id } }),
    errorCode: "HAS_CITIES",
    errorMsg: "Cannot delete zone — it still has cities assigned to it",
  },
  createSchema,
  updateSchema,
});

export default router;
