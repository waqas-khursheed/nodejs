import express from "express";
import {
  createBrand,
  listBrands,
  getBrand,
  updateBrand,
  toggleBrandStatus,
  deleteBrand,
} from "../controllers/admin.brand.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  brandSchema,
  updateBrandSchema,
  brandIdParamSchema,
  brandListQuerySchema,
} from "../validations/brand.validation.js";

const router = express.Router();

router.use((req, res, next) => {
  req.module = "brands";
  next();
});

router.post(
  "/create",
  adminAuthMiddleware,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  validate(brandSchema),
  createBrand
);

router.get("/", adminAuthMiddleware, validateQuery(brandListQuerySchema), listBrands);

router.get("/:id", adminAuthMiddleware, validateParams(brandIdParamSchema), getBrand);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(brandIdParamSchema),
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  validate(updateBrandSchema),
  updateBrand
);

router.patch("/:id/status", adminAuthMiddleware, validateParams(brandIdParamSchema), toggleBrandStatus);

router.delete("/:id", adminAuthMiddleware, validateParams(brandIdParamSchema), deleteBrand);

export default router;
