import express from "express";
import {
  createSlide,
  listSlides,
  getSlide,
  updateSlide,
  toggleSlideStatus,
  deleteSlide,
} from "../controllers/admin.slide.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  slideSchema,
  updateSlideSchema,
  slideIdParamSchema,
  slideListQuerySchema,
} from "../validations/slide.validation.js";

const router = express.Router();

router.use((req, res, next) => {
  req.module = "slides";
  next();
});

router.post(
  "/create",
  adminAuthMiddleware,
  upload.single("image"),
  validate(slideSchema),
  createSlide
);

router.get("/", adminAuthMiddleware, validateQuery(slideListQuerySchema), listSlides);

router.get("/:id", adminAuthMiddleware, validateParams(slideIdParamSchema), getSlide);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(slideIdParamSchema),
  upload.single("image"),
  validate(updateSlideSchema),
  updateSlide
);

router.patch(
  "/:id/status",
  adminAuthMiddleware,
  validateParams(slideIdParamSchema),
  toggleSlideStatus
);

router.delete("/:id", adminAuthMiddleware, validateParams(slideIdParamSchema), deleteSlide);

export default router;
