import express from "express";
import {
  createCommonPage,
  listCommonPages,
  getCommonPage,
  updateCommonPage,
  deleteCommonPage,
} from "../controllers/admin.commonPage.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  commonPageIdParamSchema,
  commonPageListQuerySchema,
  createCommonPageSchema,
  updateCommonPageSchema,
} from "../validations/commonPage.validation.js";

const router = express.Router();

router.use((req, res, next) => {
  req.module = "cms";
  next();
});

router.post(
  "/create",
  adminAuthMiddleware,
  upload.single("image"),
  validate(createCommonPageSchema),
  createCommonPage
);

router.get("/", adminAuthMiddleware, validateQuery(commonPageListQuerySchema), listCommonPages);

router.get("/:id", adminAuthMiddleware, validateParams(commonPageIdParamSchema), getCommonPage);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(commonPageIdParamSchema),
  upload.single("image"),
  validate(updateCommonPageSchema),
  updateCommonPage
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  validateParams(commonPageIdParamSchema),
  deleteCommonPage
);

export default router;
