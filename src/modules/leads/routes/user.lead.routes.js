import express from "express";
import { subscribe, submitContactForm } from "../controllers/user.lead.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { subscribeSchema, contactFormSchema } from "../validations/user.lead.validation.js";

const router = express.Router();

router.post("/subscribe", validate(subscribeSchema), subscribe);
router.post("/contact-us", validate(contactFormSchema), submitContactForm);

export default router;
