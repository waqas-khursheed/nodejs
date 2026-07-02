import express from "express";
import {
  createAttributeItem,
  listAttributeItems,
  getAttributeItem,
  updateAttributeItem,
  deleteAttributeItem,
} from "../controllers/admin.attributeItem.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  attributeItemSchema,
  updateAttributeItemSchema,
  attributeItemIdParamSchema,
  attributeItemListQuerySchema,
} from "../validations/attribute.validation.js";

const router = express.Router();

router.use((req, res, next) => {
  req.module = "attributes";
  next();
});

router.post(
  "/create",
  adminAuthMiddleware,
  upload.single("image"),
  validate(attributeItemSchema),
  createAttributeItem
);

router.get(
  "/",
  adminAuthMiddleware,
  validateQuery(attributeItemListQuerySchema),
  listAttributeItems
);

router.get(
  "/:id",
  adminAuthMiddleware,
  validateParams(attributeItemIdParamSchema),
  getAttributeItem
);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(attributeItemIdParamSchema),
  upload.single("image"),
  validate(updateAttributeItemSchema),
  updateAttributeItem
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  validateParams(attributeItemIdParamSchema),
  deleteAttributeItem
);

export default router;
