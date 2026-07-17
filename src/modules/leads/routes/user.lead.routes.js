import express from "express";
import { subscribe, submitContactForm } from "../controllers/user.lead.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { publicFormLimiter } from "../../../shared/middleware/rateLimiter.js";
import { subscribeSchema, contactFormSchema } from "../validations/user.lead.validation.js";

const router = express.Router();

router.post("/subscribe", publicFormLimiter, validate(subscribeSchema), subscribe);
router.post("/contact-us", publicFormLimiter, validate(contactFormSchema), submitContactForm);

export default router;
