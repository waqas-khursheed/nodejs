import {
  createCommonPageRepo,
  findCommonPageByIdRepo,
  findCommonPageByNameRepo,
  findAllCommonPagesRepo,
  updateCommonPageRepo,
  deleteCommonPageRepo,
} from "../repositories/commonPage.repository.js";
import { slugify } from "../../../shared/helpers/helpers.js";
import { deleteUploadedFile, scheduleImageReplacement } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

const UPLOAD_FOLDER = "cms";

export const createCommonPageService = async (data) => {
  const exists = await findCommonPageByNameRepo(data.page_name);
  if (exists) throw new Error("PAGE_ALREADY_EXISTS");

  const page = await createCommonPageRepo({ ...data, slug: slugify(data.title) });
  return page;
};

export const getCommonPagesService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.status !== undefined && query.status !== "") where.status = query.status;
  if (query.page_name) where.page_name = query.page_name;

  if (query.search) {
    const { Op } = await import("sequelize");
    where.title = { [Op.like]: `%${query.search}%` };
  }

  const { count, rows } = await findAllCommonPagesRepo({ where, limit, offset });

  return { pages: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getCommonPageByIdService = async (id) => {
  const page = await findCommonPageByIdRepo(id);
  if (!page) throw new Error("PAGE_NOT_FOUND");
  return page;
};

export const updateCommonPageService = async (id, data) => {
  const page = await findCommonPageByIdRepo(id);
  if (!page) throw new Error("PAGE_NOT_FOUND");

  if (data.page_name) {
    const exists = await findCommonPageByNameRepo(data.page_name, id);
    if (exists) throw new Error("PAGE_ALREADY_EXISTS");
  }

  const updateData = { ...data };
  if (data.title) updateData.slug = slugify(data.title);

  scheduleImageReplacement(UPLOAD_FOLDER, page.image, data.image);

  return await updateCommonPageRepo(id, updateData);
};

export const deleteCommonPageService = async (id) => {
  const page = await findCommonPageByIdRepo(id);
  if (!page) throw new Error("PAGE_NOT_FOUND");

  await deleteCommonPageRepo(id);
  if (page.image) deleteUploadedFile(UPLOAD_FOLDER, page.image);
  return true;
};
