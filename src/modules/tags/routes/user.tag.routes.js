import express from "express";
import Joi from "joi";
import { listTags, getTag } from "../controllers/user.tag.controller.js";
import { validateParams } from "../../../shared/middleware/validateParams.middleware.js";

const slugParamSchema = Joi.object({
  slug: Joi.string().trim().min(1).required(),
});

const router = express.Router();

router.get("/", listTags);
router.get("/:slug", validateParams(slugParamSchema), getTag);

export default router;
