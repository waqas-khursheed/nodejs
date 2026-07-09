import express from "express";
import Joi from "joi";
import { getContactUsPage, updateContactUsPage } from "../controllers/admin.contactUsPage.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";

const updateSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150),
  content: Joi.string().trim().min(1),
  map: Joi.string().trim().allow(""),
  status: Joi.number().valid(0, 1),
}).min(1);

const router = express.Router();

router.get("/", adminAuthMiddleware, getContactUsPage);
router.put("/", adminAuthMiddleware, validate(updateSchema), updateContactUsPage);

export default router;
