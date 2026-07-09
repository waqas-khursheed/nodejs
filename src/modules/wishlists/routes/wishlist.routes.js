import express from "express";
import Joi from "joi";
import { addToWishlist, removeFromWishlist, listWishlist } from "../controllers/wishlist.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams } from "../../../shared/middleware/validateParams.middleware.js";

const addSchema = Joi.object({
  product_id: Joi.number().integer().positive().required(),
});

const productIdParamSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

const router = express.Router();

router.use(authMiddleware);

router.get("/", listWishlist);
router.post("/", validate(addSchema), addToWishlist);
router.delete("/:productId", validateParams(productIdParamSchema), removeFromWishlist);

export default router;
