import express from "express";
import { getWebSetting, updateWebSetting } from "../controllers/admin.webSetting.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { updateWebSettingSchema } from "../validations/webSetting.validation.js";

const logoUploadFields = upload.fields([
  { name: "main_logo", maxCount: 1 },
  { name: "fav_icon", maxCount: 1 },
]);

const router = express.Router();

router.use((req, res, next) => {
  req.module = "settings";
  next();
});

router.get("/", adminAuthMiddleware, getWebSetting);

router.put(
  "/",
  adminAuthMiddleware,
  logoUploadFields,
  validate(updateWebSettingSchema),
  updateWebSetting
);

export default router;
