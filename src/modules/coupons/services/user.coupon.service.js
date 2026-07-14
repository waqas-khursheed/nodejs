import {
  findActiveCouponByCodeRepo,
  findUsedCouponRepo,
} from "../repositories/user.coupon.repository.js";
import { resolveEligibleSubtotal, assertCouponIsUsable } from "./couponEligibility.service.js";
import { getCartService } from "../../carts/services/cart.service.js";

export const previewCouponService = async (userId, code) => {
  const cart = await getCartService({ user_id: userId });
  if (!cart.items.length) throw new Error("EMPTY_CART");

  const coupon = await findActiveCouponByCodeRepo(code);
  if (!coupon) throw new Error("COUPON_NOT_FOUND");

  const alreadyUsed = await findUsedCouponRepo(userId, coupon.id);
  if (alreadyUsed) throw new Error("COUPON_ALREADY_USED");

  const eligibleSubtotal = await resolveEligibleSubtotal(coupon, cart);
  assertCouponIsUsable(coupon, eligibleSubtotal);

  const discountAmount = Number(((eligibleSubtotal * coupon.percentage) / 100).toFixed(2));

  return {
    code: coupon.code,
    percentage: coupon.percentage,
    cartSubtotal: cart.subTotal,
    eligibleSubtotal: Number(eligibleSubtotal.toFixed(2)),
    discountAmount,
    newTotal: Number((cart.subTotal - discountAmount).toFixed(2)),
  };
};
