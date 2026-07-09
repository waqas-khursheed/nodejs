import Joi from "joi";
import Country from "../../../database/models/Country.js";
import State from "../../../database/models/State.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  country_code: Joi.string().trim().uppercase().length(2).required(),
  country_name: Joi.string().trim().min(2).max(100).required(),
});

const updateSchema = Joi.object({
  country_code: Joi.string().trim().uppercase().length(2),
  country_name: Joi.string().trim().min(2).max(100),
}).min(1);

const router = makeLookupResourceRouter({
  Model: Country,
  resourceLabel: "Country",
  listKey: "countries",
  searchField: "country_name",
  childBlock: {
    countFn: (id) => State.count({ where: { country_id: id } }),
    errorCode: "HAS_STATES",
    errorMsg: "Cannot delete country — it still has states assigned to it",
  },
  createSchema,
  updateSchema,
});

export default router;
