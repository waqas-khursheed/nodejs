import express from "express";
import {
  createCategory,
  listCategories,
  getCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
} from "../../../modules/categories/controllers/admin.category.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  categorySchema,
  updateCategorySchema,
  categoryIdParamSchema,
  categoryListQuerySchema,
} from "../validations/category.validation.js";

const router = express.Router();

// module set
router.use((req, res, next) => {
  req.module = "categories";
  next();
});

router.post(
  "/create",
  adminAuthMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  validate(categorySchema),
  createCategory
);

router.get(
  "/",
  adminAuthMiddleware,
  validateQuery(categoryListQuerySchema),
  listCategories
);

router.get(
  "/:id",
  adminAuthMiddleware,
  validateParams(categoryIdParamSchema),
  getCategory
);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(categoryIdParamSchema),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  validate(updateCategorySchema),
  updateCategory
);

router.patch(
  "/:id/status",
  adminAuthMiddleware,
  validateParams(categoryIdParamSchema),
  toggleCategoryStatus
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  validateParams(categoryIdParamSchema),
  deleteCategory
);

export default router;
