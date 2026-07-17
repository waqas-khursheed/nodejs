import express from "express";
import {
  listAdmins,
  createAdmin,
  toggleAdminStatus,
  removeAdmin,
} from "../controllers/admin.auth.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import { errorResponse } from "../../../shared/responses/apiResponse.js";
import {
  createAdminSchema,
  adminIdParamSchema,
  adminListQuerySchema,
} from "../validations/admin.management.validation.js";

// Only a super admin (is_admin === 1) may view or manage other admin
// accounts — everyone else gets a 403 here, before the request ever reaches
// a controller/service.
const requireSuperAdmin = (req, res, next) => {
  if (req.admin.is_admin !== 1) {
    return errorResponse(res, "Only a super admin can manage admin accounts", 403);
  }
  next();
};

const router = express.Router();

router.use(adminAuthMiddleware, requireSuperAdmin);

router.get("/", validateQuery(adminListQuerySchema), listAdmins);
router.post("/", validate(createAdminSchema), createAdmin);
router.patch("/:id/status", validateParams(adminIdParamSchema), toggleAdminStatus);
router.delete("/:id", validateParams(adminIdParamSchema), removeAdmin);

export default router;
