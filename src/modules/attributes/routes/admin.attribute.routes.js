import express from "express";
import {
  createAttribute,
  listAttributes,
  getAttribute,
  updateAttribute,
  deleteAttribute,
} from "../controllers/admin.attribute.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  attributeSchema,
  updateAttributeSchema,
  attributeIdParamSchema,
  attributeListQuerySchema,
} from "../validations/attribute.validation.js";

const router = express.Router();

router.post("/create", adminAuthMiddleware, validate(attributeSchema), createAttribute);

router.get("/", adminAuthMiddleware, validateQuery(attributeListQuerySchema), listAttributes);

router.get("/:id", adminAuthMiddleware, validateParams(attributeIdParamSchema), getAttribute);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(attributeIdParamSchema),
  validate(updateAttributeSchema),
  updateAttribute
);

router.delete("/:id", adminAuthMiddleware, validateParams(attributeIdParamSchema), deleteAttribute);

export default router;
