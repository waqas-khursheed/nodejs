import express from "express";
import {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
  bulkDeleteProducts,
  deleteProductGalleryImage,
} from "../controllers/admin.product.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  productSchema,
  updateProductSchema,
  productIdParamSchema,
  galleryIdParamSchema,
  productListQuerySchema,
} from "../validations/product.validation.js";
import { bulkDeleteSchema } from "../../../shared/validations/bulkDelete.validation.js";

const router = express.Router();

router.use((req, res, next) => {
  req.module = "products";
  next();
});

const productFiles = upload.fields([
  { name: "featured_image", maxCount: 1 },
  { name: "hovered_image", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

router.post(
  "/create",
  adminAuthMiddleware,
  productFiles,
  validate(productSchema),
  createProduct
);

router.get("/", adminAuthMiddleware, validateQuery(productListQuerySchema), listProducts);

router.get("/:id", adminAuthMiddleware, validateParams(productIdParamSchema), getProduct);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(productIdParamSchema),
  productFiles,
  validate(updateProductSchema),
  updateProduct
);

router.patch("/:id/status", adminAuthMiddleware, validateParams(productIdParamSchema), toggleProductStatus);

router.delete("/:id", adminAuthMiddleware, validateParams(productIdParamSchema), deleteProduct);

router.post("/bulk-delete", adminAuthMiddleware, validate(bulkDeleteSchema), bulkDeleteProducts);

router.delete(
  "/gallery/:galleryId",
  adminAuthMiddleware,
  validateParams(galleryIdParamSchema),
  deleteProductGalleryImage
);

export default router;
