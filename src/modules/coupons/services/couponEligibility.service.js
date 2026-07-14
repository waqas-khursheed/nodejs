import {
  findCouponCategoryIdsRepo,
  findProductCategoryIdsRepo,
} from "../repositories/user.coupon.repository.js";

// Shared by both the "preview coupon" endpoint (user.coupon.service.js) and
// checkout (orders/services/checkout.service.js) — previously duplicated
// nearly identically in both places, which could drift out of sync.
export const resolveEligibleSubtotal = async (coupon, cart) => {
  if (coupon.to_all) return cart.subTotal;

  const categoryIds = await findCouponCategoryIdsRepo(coupon.id);
  const productIds = cart.items.map((item) => item.product_id);
  const assignments = await findProductCategoryIdsRepo(productIds);

  const eligibleProductIds = new Set(
    assignments.filter((a) => categoryIds.includes(a.category_id)).map((a) => a.product_id)
  );

  const eligibleSubtotal = cart.items
    .filter((item) => eligibleProductIds.has(item.product_id))
    .reduce((sum, item) => sum + item.lineTotal, 0);

  if (eligibleSubtotal === 0) throw new Error("COUPON_NOT_APPLICABLE");

  return eligibleSubtotal;
};

// Validates a coupon can be used *before* computing its discount: expiry,
// total usage cap, and minimum order amount. Per-user "already used" is
// checked separately by the caller (it needs a DB lookup keyed by user_id).
export const assertCouponIsUsable = (coupon, eligibleSubtotal) => {
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    throw new Error("COUPON_EXPIRED");
  }

  if (coupon.usage_limit !== null && coupon.usage_limit !== undefined && coupon.used_count >= coupon.usage_limit) {
    throw new Error("COUPON_USAGE_LIMIT_REACHED");
  }

  if (coupon.min_order_amount && eligibleSubtotal < coupon.min_order_amount) {
    throw new Error("COUPON_MIN_ORDER_NOT_MET");
  }
};
