import Joi from "joi";
import RewardSetting from "../../../database/models/RewardSetting.js";
import { makeLookupResourceRouter } from "../../../shared/factories/lookupResource.routes.js";

const createSchema = Joi.object({
  minimum_points: Joi.number().integer().min(0).required(),
  points: Joi.number().integer().min(0).required(),
  equal_to: Joi.number().integer().min(0).required(),
});

const updateSchema = Joi.object({
  minimum_points: Joi.number().integer().min(0),
  points: Joi.number().integer().min(0),
  equal_to: Joi.number().integer().min(0),
}).min(1);

const router = makeLookupResourceRouter({
  Model: RewardSetting,
  resourceLabel: "Reward setting",
  listKey: "rewardSettings",
  createSchema,
  updateSchema,
});

export default router;
