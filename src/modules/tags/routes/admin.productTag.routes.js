import express from "express";
import { getProductTags, syncProductTags } from "../controllers/admin.tag.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams } from "../../../shared/middleware/validateParams.middleware.js";
import { productIdParamSchema, syncProductTagsSchema } from "../validations/tag.validation.js";

const router = express.Router();

router.get("/:productId", adminAuthMiddleware, validateParams(productIdParamSchema), getProductTags);

router.put(
  "/:productId",
  adminAuthMiddleware,
  validateParams(productIdParamSchema),
  validate(syncProductTagsSchema),
  syncProductTags
);

export default router;
