import express from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  listCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { resolveCartOwner } from "../../../shared/middleware/cartOwner.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams } from "../../../shared/middleware/validateParams.middleware.js";
import { addToCartSchema, updateCartItemSchema, cartIdParamSchema } from "../validations/cart.validation.js";

const router = express.Router();

// Works for both logged-in users (Bearer token) and guests (X-Device-Id header).
router.use(resolveCartOwner);

router.get("/", listCart);
router.post("/", validate(addToCartSchema), addToCart);
router.delete("/", clearCart);
router.put("/:id", validateParams(cartIdParamSchema), validate(updateCartItemSchema), updateCartItem);
router.delete("/:id", validateParams(cartIdParamSchema), removeCartItem);

export default router;
