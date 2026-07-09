import Joi from "joi";
import RewardsEarningMethod from "../../../database/models/RewardsEarningMethod.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  purchase: Joi.number().integer().min(0).required(),
  equals_to: Joi.number().integer().min(0).required(),
});

const updateSchema = Joi.object({
  purchase: Joi.number().integer().min(0),
  equals_to: Joi.number().integer().min(0),
}).min(1);

const router = makeLookupResourceRouter({
  Model: RewardsEarningMethod,
  resourceLabel: "Rewards earning method",
  listKey: "rewardsEarningMethods",
  createSchema,
  updateSchema,
});

export default router;
