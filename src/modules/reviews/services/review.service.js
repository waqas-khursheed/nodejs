import {
  findReviewByIdRepo,
  findAllReviewsRepo,
  updateReviewStatusRepo,
  deleteReviewRepo,
} from "../repositories/review.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

// status: 0 = pending, 1 = approved, 2 = rejected
export const getReviewsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.status !== undefined && query.status !== "") {
    where.status = query.status;
  }

  if (query.product_id) {
    where.product_id = query.product_id;
  }

  const { count, rows } = await findAllReviewsRepo({ where, limit, offset });

  return { reviews: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getReviewByIdService = async (id) => {
  const review = await findReviewByIdRepo(id);
  if (!review) throw new Error("REVIEW_NOT_FOUND");
  return review;
};

export const updateReviewStatusService = async (id, status) => {
  const review = await findReviewByIdRepo(id);
  if (!review) throw new Error("REVIEW_NOT_FOUND");

  return await updateReviewStatusRepo(id, status);
};

export const deleteReviewService = async (id) => {
  const review = await findReviewByIdRepo(id);
  if (!review) throw new Error("REVIEW_NOT_FOUND");

  await deleteReviewRepo(id);
  return true;
};
