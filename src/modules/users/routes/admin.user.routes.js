import express from "express";
import {
  listUsers,
  getUser,
  toggleUserStatus,
  deleteUser,
} from "../controllers/admin.user.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import { userIdParamSchema, userListQuerySchema } from "../validations/user.validation.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(userListQuerySchema), listUsers);

router.get("/:id", adminAuthMiddleware, validateParams(userIdParamSchema), getUser);

router.patch(
  "/:id/status",
  adminAuthMiddleware,
  validateParams(userIdParamSchema),
  toggleUserStatus
);

router.delete("/:id", adminAuthMiddleware, validateParams(userIdParamSchema), deleteUser);

export default router;
