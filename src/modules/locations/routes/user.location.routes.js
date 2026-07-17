import express from "express";
import Joi from "joi";
import { listCountries, listStates, listCities } from "../controllers/user.location.controller.js";
import { validateQuery } from "../../../shared/middleware/validateParams.middleware.js";

const stateQuerySchema = Joi.object({
  country_id: Joi.number().integer().positive(),
});

const cityQuerySchema = Joi.object({
  state_id: Joi.number().integer().positive(),
});

const router = express.Router();

router.get("/countries", listCountries);
router.get("/states", validateQuery(stateQuerySchema), listStates);
router.get("/cities", validateQuery(cityQuerySchema), listCities);

export default router;
