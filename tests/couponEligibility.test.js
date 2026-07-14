import { assertCouponIsUsable } from "../src/modules/coupons/services/couponEligibility.service.js";

const baseCoupon = {
  expires_at: null,
  usage_limit: null,
  used_count: 0,
  min_order_amount: null,
};

describe("assertCouponIsUsable", () => {
  it("does not throw for a coupon with no restrictions", () => {
    expect(() => assertCouponIsUsable(baseCoupon, 100)).not.toThrow();
  });

  it("throws COUPON_EXPIRED for a past expiry date", () => {
    const coupon = { ...baseCoupon, expires_at: new Date(Date.now() - 1000).toISOString() };
    expect(() => assertCouponIsUsable(coupon, 100)).toThrow("COUPON_EXPIRED");
  });

  it("does not throw for a future expiry date", () => {
    const coupon = { ...baseCoupon, expires_at: new Date(Date.now() + 1000 * 60 * 60).toISOString() };
    expect(() => assertCouponIsUsable(coupon, 100)).not.toThrow();
  });

  it("throws COUPON_USAGE_LIMIT_REACHED once used_count reaches usage_limit", () => {
    const coupon = { ...baseCoupon, usage_limit: 5, used_count: 5 };
    expect(() => assertCouponIsUsable(coupon, 100)).toThrow("COUPON_USAGE_LIMIT_REACHED");
  });

  it("does not throw while used_count is still below usage_limit", () => {
    const coupon = { ...baseCoupon, usage_limit: 5, used_count: 4 };
    expect(() => assertCouponIsUsable(coupon, 100)).not.toThrow();
  });

  it("throws COUPON_MIN_ORDER_NOT_MET when the eligible subtotal is below the minimum", () => {
    const coupon = { ...baseCoupon, min_order_amount: 50 };
    expect(() => assertCouponIsUsable(coupon, 49.99)).toThrow("COUPON_MIN_ORDER_NOT_MET");
  });

  it("does not throw when the eligible subtotal meets the minimum exactly", () => {
    const coupon = { ...baseCoupon, min_order_amount: 50 };
    expect(() => assertCouponIsUsable(coupon, 50)).not.toThrow();
  });
});
