import { Op } from "sequelize";
import Coupon from "../../../database/models/Coupon.js";
import MetaCouponCategory from "../../../database/models/MetaCouponCategory.js";
import ProductCategory from "../../../database/models/ProductCategory.js";

const detailIncludes = [
  {
    model: MetaCouponCategory,
    as: "metaCouponCategories",
    include: [{ model: ProductCategory, as: "cat" }],
  },
];

export const createCouponRepo = async (data) => {
  return await Coupon.create(data);
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

export const updateCouponRepo = async (id, data) => {
  await Coupon.update(data, { where: { id } });
  return await findCouponByIdRepo(id, true);
};

export const deleteCouponRepo = async (id) => {
  return await Coupon.destroy({ where: { id } });
};

export const syncCouponCategoriesRepo = async (couponId, categoryIds) => {
  await MetaCouponCategory.destroy({ where: { coupon_id: couponId } });

  if (categoryIds && categoryIds.length > 0) {
    const rows = categoryIds.map((cat_id) => ({ coupon_id: couponId, cat_id }));
    await MetaCouponCategory.bulkCreate(rows);
  }
};

export const findCategoriesByIdsRepo = async (categoryIds) => {
  return await ProductCategory.findAll({ where: { id: categoryIds } });
};
