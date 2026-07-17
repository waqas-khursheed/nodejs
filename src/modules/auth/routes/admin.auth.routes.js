import express from "express";
import {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} from "../controllers/admin.auth.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { adminLoginSchema } from "../validations/admin.auth.validation.js";
import { updateAdminProfileSchema, changeAdminPasswordSchema } from "../validations/admin.profile.validation.js";
import { authLimiter } from "../../../shared/middleware/rateLimiter.js";

const router = express.Router();

router.use((req, res, next) => {
  req.module = "admins";
  next();
});

router.post("/login", authLimiter, validate(adminLoginSchema), adminLogin);

router.get("/profile", adminAuthMiddleware, getAdminProfile);

router.put(
  "/profile",
  adminAuthMiddleware,
  upload.single("image"),
  validate(updateAdminProfileSchema),
  updateAdminProfile
);

router.patch(
  "/change-password",
  adminAuthMiddleware,
  validate(changeAdminPasswordSchema),
  changeAdminPassword
);

export default router;
