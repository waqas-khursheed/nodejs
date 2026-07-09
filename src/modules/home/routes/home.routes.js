import express from "express";
import Joi from "joi";
import { getHomeContent } from "../controllers/home.controller.js";
import { getPage, getContactUsPage, getFaqs } from "../controllers/content.controller.js";
import { validateParams } from "../../../shared/middleware/validateParams.middleware.js";

const slugParamSchema = Joi.object({
  slug: Joi.string().trim().min(1).required(),
});

const router = express.Router();

router.get("/home", getHomeContent);
router.get("/faqs", getFaqs);
router.get("/contact-us-page", getContactUsPage);
router.get("/pages/:slug", validateParams(slugParamSchema), getPage);

export default router;
