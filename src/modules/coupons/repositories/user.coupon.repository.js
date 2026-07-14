import Coupon from "../../../database/models/Coupon.js";
import MetaCouponCategory from "../../../database/models/MetaCouponCategory.js";
import UsedCoupon from "../../../database/models/UsedCoupon.js";
import AssignCatToProduct from "../../../database/models/AssignCatToProduct.js";

export const findActiveCouponByCodeRepo = async (code) => {
  return await Coupon.findOne({ where: { code: code.toUpperCase(), status: 1 } });
};

export const findCouponCategoryIdsRepo = async (couponId) => {
  const rows = await MetaCouponCategory.findAll({ where: { coupon_id: couponId } });
  return rows.map((r) => r.cat_id);
};

export const findUsedCouponRepo = async (userId, couponId) => {
  return await UsedCoupon.findOne({ where: { user_id: userId, coupon_id: couponId } });
};

export const createUsedCouponRepo = async (userId, couponId, options = {}) => {
  return await UsedCoupon.create({ user_id: userId, coupon_id: couponId }, options);
};

export const findProductCategoryIdsRepo = async (productIds) => {
  const rows = await AssignCatToProduct.findAll({ where: { product_id: productIds } });
  return rows;
};
