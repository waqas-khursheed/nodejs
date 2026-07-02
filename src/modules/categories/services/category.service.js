import {
  createCategoryRepo,
  findCategoryByTitleRepo,
  findCategoryByIdRepo,
  findAllCategoriesRepo,
  findChildCategoriesRepo,
  updateCategoryRepo,
  deleteCategoryRepo,
} from "../repositories/category.repository.js";
import { slugify } from "../../../shared/helpers/helpers.js";
import { deleteUploadedFile } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const createCategoryService = async (data) => {
  const {
    title,
    description,
    meta_title,
    meta_keywords,
    meta_desc,
    parent_id,
    status,
    order_by,
    is_size_chart,
    image,
    icon,
  } = data;

  // 1. check duplicate
  const exists = await findCategoryByTitleRepo(title);

  if (exists) {
    throw new Error("CATEGORY_ALREADY_EXISTS");
  }

  // 2. validate parent category exists (if provided)
  if (parent_id && Number(parent_id) !== 0) {
    const parent = await findCategoryByIdRepo(parent_id);

    if (!parent) {
      throw new Error("PARENT_CATEGORY_NOT_FOUND");
    }
  }

  // 3. prepare data
  const categoryData = {
    title: title.toLowerCase(),
    slug: slugify(title),
    description,
    meta_title,
    meta_keywords,
    meta_desc,
    parent_id: parent_id || 0,
    status,
    order_by,
    is_size_chart,
    image,
    icon,
  };

  return await createCategoryRepo(categoryData);
};

export const getCategoriesService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.status !== undefined && query.status !== "") {
    where.status = query.status;
  }

  if (query.parent_id !== undefined && query.parent_id !== "") {
    where.parent_id = query.parent_id;
  }

  if (query.search) {
    const { Op } = await import("sequelize");
    where.title = { [Op.like]: `%${query.search.toLowerCase()}%` };
  }

  const { count, rows } = await findAllCategoriesRepo({ where, limit, offset });

  return {
    categories: rows,
    meta: buildPaginationMeta({ count, page, limit }),
  };
};

export const getCategoryByIdService = async (id) => {
  const category = await findCategoryByIdRepo(id);

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  return category;
};

export const updateCategoryService = async (id, data) => {
  const category = await findCategoryByIdRepo(id);

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  const {
    title,
    description,
    meta_title,
    meta_keywords,
    meta_desc,
    parent_id,
    status,
    order_by,
    is_size_chart,
    image,
    icon,
  } = data;

  // duplicate title check (excluding self)
  if (title) {
    const exists = await findCategoryByTitleRepo(title, id);

    if (exists) {
      throw new Error("CATEGORY_ALREADY_EXISTS");
    }
  }

  // prevent self-reference / assigning own child as parent
  if (parent_id !== undefined && Number(parent_id) !== 0) {
    if (Number(parent_id) === Number(id)) {
      throw new Error("CATEGORY_CANNOT_BE_OWN_PARENT");
    }

    const parent = await findCategoryByIdRepo(parent_id);

    if (!parent) {
      throw new Error("PARENT_CATEGORY_NOT_FOUND");
    }
  }

  const updateData = {};

  if (title !== undefined) {
    updateData.title = title.toLowerCase();
    updateData.slug = slugify(title);
  }
  if (description !== undefined) updateData.description = description;
  if (meta_title !== undefined) updateData.meta_title = meta_title;
  if (meta_keywords !== undefined) updateData.meta_keywords = meta_keywords;
  if (meta_desc !== undefined) updateData.meta_desc = meta_desc;
  if (parent_id !== undefined) updateData.parent_id = parent_id;
  if (status !== undefined) updateData.status = status;
  if (order_by !== undefined) updateData.order_by = order_by;
  if (is_size_chart !== undefined) updateData.is_size_chart = is_size_chart;

  // replace image/icon (and clean up old file)
  if (image) {
    updateData.image = image;
    if (category.image) deleteUploadedFile("categories", category.image);
  }
  if (icon) {
    updateData.icon = icon;
    if (category.icon) deleteUploadedFile("categories", category.icon);
  }

  return await updateCategoryRepo(id, updateData);
};

export const toggleCategoryStatusService = async (id) => {
  const category = await findCategoryByIdRepo(id);

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  const newStatus = category.status === 1 ? 0 : 1;

  return await updateCategoryRepo(id, { status: newStatus });
};

export const deleteCategoryService = async (id) => {
  const category = await findCategoryByIdRepo(id);

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  const children = await findChildCategoriesRepo(id);

  if (children.length > 0) {
    throw new Error("CATEGORY_HAS_CHILDREN");
  }

  await deleteCategoryRepo(id);

  if (category.image) deleteUploadedFile("categories", category.image);
  if (category.icon) deleteUploadedFile("categories", category.icon);

  return true;
};
