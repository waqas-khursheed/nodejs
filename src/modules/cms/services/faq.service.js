import {
  createFaqRepo,
  findFaqByIdRepo,
  findAllFaqsRepo,
  updateFaqRepo,
  deleteFaqRepo,
} from "../repositories/faq.repository.js";
import FaqCategory from "../../../database/models/FaqCategory.js";
import { slugify } from "../../../shared/helpers/helpers.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const createFaqService = async (data) => {
  const category = await FaqCategory.findByPk(data.category_id);
  if (!category) throw new Error("CATEGORY_NOT_FOUND");

  const faq = await createFaqRepo({ ...data, slug: slugify(data.question) });
  return await findFaqByIdRepo(faq.id);
};

export const getFaqsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.category_id) {
    where.category_id = query.category_id;
  }

  const { count, rows } = await findAllFaqsRepo({ where, limit, offset });

  return { faqs: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getFaqByIdService = async (id) => {
  const faq = await findFaqByIdRepo(id);
  if (!faq) throw new Error("FAQ_NOT_FOUND");
  return faq;
};

export const updateFaqService = async (id, data) => {
  const faq = await findFaqByIdRepo(id);
  if (!faq) throw new Error("FAQ_NOT_FOUND");

  if (data.category_id) {
    const category = await FaqCategory.findByPk(data.category_id);
    if (!category) throw new Error("CATEGORY_NOT_FOUND");
  }

  const updateData = { ...data };
  if (data.question) updateData.slug = slugify(data.question);

  return await updateFaqRepo(id, updateData);
};

export const deleteFaqService = async (id) => {
  const faq = await findFaqByIdRepo(id);
  if (!faq) throw new Error("FAQ_NOT_FOUND");

  await deleteFaqRepo(id);
  return true;
};
