import express from "express";
import {
  createFaq,
  listFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/admin.faq.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  faqIdParamSchema,
  faqListQuerySchema,
  createFaqSchema,
  updateFaqSchema,
} from "../validations/faq.validation.js";

const router = express.Router();

router.post("/create", adminAuthMiddleware, validate(createFaqSchema), createFaq);
router.get("/", adminAuthMiddleware, validateQuery(faqListQuerySchema), listFaqs);
router.get("/:id", adminAuthMiddleware, validateParams(faqIdParamSchema), getFaq);
router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(faqIdParamSchema),
  validate(updateFaqSchema),
  updateFaq
);
router.delete("/:id", adminAuthMiddleware, validateParams(faqIdParamSchema), deleteFaq);

export default router;
