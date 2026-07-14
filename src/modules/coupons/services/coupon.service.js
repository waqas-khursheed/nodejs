import { Op } from "sequelize";
import { sequelize } from "../../../config/db.js";
import {
  createCouponRepo,
  findCouponByCodeRepo,
  findCouponByIdRepo,
  findAllCouponsRepo,
  updateCouponRepo,
  updateCouponFieldsRepo,
  deleteCouponRepo,
  syncCouponCategoriesRepo,
  findCategoriesByIdsRepo,
  findUsedCouponsByCouponIdRepo,
} from "../repositories/coupon.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

const validateCategoryIds = async (categoryIds) => {
  if (!categoryIds || categoryIds.length === 0) return;

  const found = await findCategoriesByIdsRepo(categoryIds);
  if (found.length !== categoryIds.length) {
    throw new Error("CATEGORY_NOT_FOUND");
  }
};

export const createCouponService = async (data) => {
  const { code, category_ids, ...rest } = data;

  const exists = await findCouponByCodeRepo(code);
  if (exists) {
    throw new Error("COUPON_ALREADY_EXISTS");
  }

  await validateCategoryIds(category_ids);

  const couponId = await sequelize.transaction(async (transaction) => {
    const coupon = await createCouponRepo({ code: code.toUpperCase(), ...rest }, { transaction });

    if (category_ids && category_ids.length > 0) {
      await syncCouponCategoriesRepo(coupon.id, category_ids, { transaction });
    }

    return coupon.id;
  });

  return await findCouponByIdRepo(couponId, true);
};

export const getCouponsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.status !== undefined && query.status !== "") {
    where.status = query.status;
  }

  if (query.search) {
    where.code = { [Op.like]: `%${query.search.toUpperCase()}%` };
  }

  const { count, rows } = await findAllCouponsRepo({ where, limit, offset });

  return { coupons: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getCouponByIdService = async (id) => {
  const coupon = await findCouponByIdRepo(id, true);
  if (!coupon) throw new Error("COUPON_NOT_FOUND");
  return coupon;
};

export const updateCouponService = async (id, data) => {
  const coupon = await findCouponByIdRepo(id);
  if (!coupon) throw new Error("COUPON_NOT_FOUND");

  const { code, category_ids, ...rest } = data;

  if (code) {
    const exists = await findCouponByCodeRepo(code, id);
    if (exists) throw new Error("COUPON_ALREADY_EXISTS");
  }

  await validateCategoryIds(category_ids);

  const updateData = { ...rest };
  if (code !== undefined) updateData.code = code.toUpperCase();

  await sequelize.transaction(async (transaction) => {
    await updateCouponFieldsRepo(id, updateData, { transaction });

    if (category_ids !== undefined) {
      await syncCouponCategoriesRepo(id, category_ids, { transaction });
    }
  });

  return await findCouponByIdRepo(id, true);
};

export const toggleCouponStatusService = async (id) => {
  const coupon = await findCouponByIdRepo(id);
  if (!coupon) throw new Error("COUPON_NOT_FOUND");

  const newStatus = Number(coupon.status) === 1 ? 0 : 1;
  return await updateCouponRepo(id, { status: newStatus });
};

export const deleteCouponService = async (id) => {
  const coupon = await findCouponByIdRepo(id);
  if (!coupon) throw new Error("COUPON_NOT_FOUND");

  await deleteCouponRepo(id);
  return true;
};

export const getCouponUsagesService = async (id, query) => {
  const coupon = await findCouponByIdRepo(id);
  if (!coupon) throw new Error("COUPON_NOT_FOUND");

  const { page, limit, offset } = getPagination(query);
  const { count, rows } = await findUsedCouponsByCouponIdRepo(id, { limit, offset });

  return { usages: rows, meta: buildPaginationMeta({ count, page, limit }) };
};
