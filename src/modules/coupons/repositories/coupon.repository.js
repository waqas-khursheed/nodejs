import { Op } from "sequelize";
import Coupon from "../../../database/models/Coupon.js";
import MetaCouponCategory from "../../../database/models/MetaCouponCategory.js";
import ProductCategory from "../../../database/models/ProductCategory.js";
import UsedCoupon from "../../../database/models/UsedCoupon.js";
import User from "../../../database/models/User.js";

const detailIncludes = [
  {
    model: MetaCouponCategory,
    as: "metaCouponCategories",
    include: [{ model: ProductCategory, as: "cat" }],
  },
];

export const createCouponRepo = async (data, options = {}) => {
  return await Coupon.create(data, options);
};

export const findCouponByCodeRepo = async (code, excludeId = null) => {
  const where = { code };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  return await Coupon.findOne({ where });
};

export const findCouponByIdRepo = async (id, withRelations = false) => {
  return await Coupon.findByPk(id, { include: withRelations ? detailIncludes : [] });
};

export const findAllCouponsRepo = async ({ where, limit, offset }) => {
  return await Coupon.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });
};

export const updateCouponRepo = async (id, data, options = {}) => {
  await Coupon.update(data, { where: { id }, ...options });
  return await findCouponByIdRepo(id, true);
};

// Write-only variant (no self re-read) for use inside a transaction — reading
// the row back through a separate, non-transactional connection while the
// row is still locked by an uncommitted transaction can hang/deadlock.
export const updateCouponFieldsRepo = async (id, data, options = {}) => {
  await Coupon.update(data, { where: { id }, ...options });
};

export const deleteCouponRepo = async (id) => {
  return await Coupon.destroy({ where: { id } });
};

export const syncCouponCategoriesRepo = async (couponId, categoryIds, options = {}) => {
  await MetaCouponCategory.destroy({ where: { coupon_id: couponId }, ...options });

  if (categoryIds && categoryIds.length > 0) {
    const rows = categoryIds.map((cat_id) => ({ coupon_id: couponId, cat_id }));
    await MetaCouponCategory.bulkCreate(rows, options);
  }
};

// Atomic conditional update — only increments if usage_limit hasn't been
// reached (or is unlimited), so two concurrent checkouts racing on the same
// near-exhausted coupon can't both succeed past the limit. Returns whether
// the increment actually happened.
export const incrementCouponUsageRepo = async (couponId, options = {}) => {
  const [affectedCount] = await Coupon.update(
    { used_count: Coupon.sequelize.literal("used_count + 1") },
    {
      where: {
        id: couponId,
        [Op.or]: [{ usage_limit: null }, { usage_limit: { [Op.gt]: Coupon.sequelize.col("used_count") } }],
      },
      ...options,
    }
  );

  return affectedCount > 0;
};

export const findCategoriesByIdsRepo = async (categoryIds) => {
  return await ProductCategory.findAll({ where: { id: categoryIds } });
};

export const findUsedCouponsByCouponIdRepo = async (couponId, { limit, offset }) => {
  return await UsedCoupon.findAndCountAll({
    where: { coupon_id: couponId },
    limit,
    offset,
    include: [{ model: User, as: "user", attributes: ["id", "first_name", "last_name", "email"] }],
    order: [["created_at", "DESC"]],
  });
};
