import express from "express";
import Joi from "joi";
import { listCategories, getCategory } from "../controllers/user.category.controller.js";
import { validateParams } from "../../../shared/middleware/validateParams.middleware.js";

const slugParamSchema = Joi.object({
  slug: Joi.string().trim().min(1).required(),
});

const router = express.Router();

router.get("/", listCategories);
router.get("/:slug", validateParams(slugParamSchema), getCategory);

export default router;
