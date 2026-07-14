import express from "express";
import {
  createTag,
  listTags,
  getTag,
  updateTag,
  deleteTag,
  getMetaTags,
  syncMetaTags,
} from "../controllers/admin.tag.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  tagSchema,
  updateTagSchema,
  tagIdParamSchema,
  tagListQuerySchema,
  syncMetaTagsSchema,
} from "../validations/tag.validation.js";

const router = express.Router();

router.use((req, res, next) => {
  req.module = "tags";
  next();
});

const tagFiles = upload.fields([
  { name: "icon", maxCount: 1 },
  { name: "og_image", maxCount: 1 },
]);

router.post("/create", adminAuthMiddleware, tagFiles, validate(tagSchema), createTag);

router.get("/", adminAuthMiddleware, validateQuery(tagListQuerySchema), listTags);

router.get("/:id", adminAuthMiddleware, validateParams(tagIdParamSchema), getTag);

router.put("/:id", adminAuthMiddleware, validateParams(tagIdParamSchema), tagFiles, validate(updateTagSchema), updateTag);

router.delete("/:id", adminAuthMiddleware, validateParams(tagIdParamSchema), deleteTag);

router.get("/:id/meta-tags", adminAuthMiddleware, validateParams(tagIdParamSchema), getMetaTags);

router.put(
  "/:id/meta-tags",
  adminAuthMiddleware,
  validateParams(tagIdParamSchema),
  validate(syncMetaTagsSchema),
  syncMetaTags
);

export default router;
