import express from "express";
import Joi from "joi";
import { listBrands, getBrand } from "../controllers/user.brand.controller.js";
import { validateParams } from "../../../shared/middleware/validateParams.middleware.js";

const slugParamSchema = Joi.object({
  slug: Joi.string().trim().min(1).required(),
});

const router = express.Router();

router.get("/", listBrands);
router.get("/:slug", validateParams(slugParamSchema), getBrand);

export default router;
