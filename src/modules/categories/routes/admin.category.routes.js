import express from "express";
import { createCategory } from "../../../modules/categories/controllers/admin.category.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { categorySchema } from "../validations/category.validation.js";

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

export default router;