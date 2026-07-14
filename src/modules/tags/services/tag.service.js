import { Op } from "sequelize";
import {
  createTagRepo,
  findTagByNameRepo,
  findTagByIdRepo,
  findAllTagsRepo,
  updateTagRepo,
  deleteTagRepo,
  countProductsForTagRepo,
  findTagIdsForProductRepo,
  syncProductTagsRepo,
  findTagsByIdsRepo,
  findProductByIdRepo,
  findMetaTagsForTagRepo,
  syncMetaTagsRepo,
} from "../repositories/tag.repository.js";
import { slugify } from "../../../shared/helpers/helpers.js";
import { deleteUploadedFile, scheduleImageReplacement } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

const MODULE = "tags";

export const createTagService = async (data) => {
  const { name, icon, og_image, ...rest } = data;

  const exists = await findTagByNameRepo(name);
  if (exists) {
    throw new Error("TAG_ALREADY_EXISTS");
  }

  return await createTagRepo({
    ...rest,
    name,
    slug: slugify(name),
    icon: icon || null,
    og_image: og_image || null,
  });
};

export const getTagsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = query.search ? { name: { [Op.like]: `%${query.search}%` } } : {};

  const { count, rows } = await findAllTagsRepo({ where, limit, offset });

  return { tags: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getTagByIdService = async (id) => {
  const tag = await findTagByIdRepo(id);
  if (!tag) throw new Error("TAG_NOT_FOUND");
  return tag;
};

export const updateTagService = async (id, data) => {
  const tag = await findTagByIdRepo(id);
  if (!tag) throw new Error("TAG_NOT_FOUND");

  const { name, icon, og_image, ...rest } = data;

  if (name) {
    const exists = await findTagByNameRepo(name, id);
    if (exists) throw new Error("TAG_ALREADY_EXISTS");
  }

  const updateData = { ...rest };
  if (name !== undefined) {
    updateData.name = name;
    updateData.slug = slugify(name);
  }

  if (icon) {
    scheduleImageReplacement(MODULE, tag.icon, icon);
    updateData.icon = icon;
  }
  if (og_image) {
    scheduleImageReplacement(MODULE, tag.og_image, og_image);
    updateData.og_image = og_image;
  }

  return await updateTagRepo(id, updateData);
};

export const deleteTagService = async (id) => {
  const tag = await findTagByIdRepo(id);
  if (!tag) throw new Error("TAG_NOT_FOUND");

  const productCount = await countProductsForTagRepo(id);
  if (productCount > 0) throw new Error("HAS_PRODUCTS");

  await deleteTagRepo(id);

  if (tag.icon) deleteUploadedFile(MODULE, tag.icon);
  if (tag.og_image) deleteUploadedFile(MODULE, tag.og_image);

  return true;
};

// ---- Product <-> Tag assignment ----

export const getProductTagsService = async (productId) => {
  const product = await findProductByIdRepo(productId);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  return await findTagIdsForProductRepo(productId);
};

export const syncProductTagsService = async (productId, tagIds) => {
  const product = await findProductByIdRepo(productId);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  if (tagIds && tagIds.length > 0) {
    const found = await findTagsByIdsRepo(tagIds);
    if (found.length !== tagIds.length) throw new Error("TAG_NOT_FOUND");
  }

  return await syncProductTagsRepo(productId, tagIds);
};

// ---- Related search terms per tag ----

export const getMetaTagsService = async (tagId) => {
  const tag = await findTagByIdRepo(tagId);
  if (!tag) throw new Error("TAG_NOT_FOUND");

  return await findMetaTagsForTagRepo(tagId);
};

export const syncMetaTagsService = async (tagId, metaTags) => {
  const tag = await findTagByIdRepo(tagId);
  if (!tag) throw new Error("TAG_NOT_FOUND");

  return await syncMetaTagsRepo(tagId, metaTags);
};
