import express from "express";
import { getAddress, upsertAddress } from "../controllers/address.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { upsertAddressSchema } from "../validations/address.validation.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAddress);
router.put("/", validate(upsertAddressSchema), upsertAddress);

export default router;
