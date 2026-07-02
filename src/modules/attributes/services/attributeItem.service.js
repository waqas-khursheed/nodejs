import { findAttributeByIdRepo } from "../repositories/attribute.repository.js";
import {
  createAttributeItemRepo,
  findAttributeItemByTitleRepo,
  findAttributeItemByIdRepo,
  findAllAttributeItemsRepo,
  updateAttributeItemRepo,
  deleteAttributeItemRepo,
} from "../repositories/attributeItem.repository.js";
import { deleteUploadedFile } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const createAttributeItemService = async (data) => {
  const { title, attribute_id, order_by, image } = data;

  const attribute = await findAttributeByIdRepo(attribute_id);

  if (!attribute) {
    throw new Error("ATTRIBUTE_NOT_FOUND");
  }

  const exists = await findAttributeItemByTitleRepo(title, attribute_id);

  if (exists) {
    throw new Error("ATTRIBUTE_ITEM_ALREADY_EXISTS");
  }

  return await createAttributeItemRepo({ title, attribute_id, order_by, image });
};

export const getAttributeItemsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.attribute_id) {
    where.attribute_id = query.attribute_id;
  }

  const { count, rows } = await findAllAttributeItemsRepo({ where, limit, offset });

  return {
    items: rows,
    meta: buildPaginationMeta({ count, page, limit }),
  };
};

export const getAttributeItemByIdService = async (id) => {
  const item = await findAttributeItemByIdRepo(id);

  if (!item) {
    throw new Error("ATTRIBUTE_ITEM_NOT_FOUND");
  }

  return item;
};

export const updateAttributeItemService = async (id, data) => {
  const item = await findAttributeItemByIdRepo(id);

  if (!item) {
    throw new Error("ATTRIBUTE_ITEM_NOT_FOUND");
  }

  const { title, attribute_id, order_by, image } = data;

  if (attribute_id) {
    const attribute = await findAttributeByIdRepo(attribute_id);

    if (!attribute) {
      throw new Error("ATTRIBUTE_NOT_FOUND");
    }
  }

  if (title) {
    const exists = await findAttributeItemByTitleRepo(
      title,
      attribute_id || item.attribute_id,
      id
    );

    if (exists) {
      throw new Error("ATTRIBUTE_ITEM_ALREADY_EXISTS");
    }
  }

  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (attribute_id !== undefined) updateData.attribute_id = attribute_id;
  if (order_by !== undefined) updateData.order_by = order_by;

  if (image) {
    updateData.image = image;
    if (item.image) deleteUploadedFile("attributes", item.image);
  }

  return await updateAttributeItemRepo(id, updateData);
};

export const deleteAttributeItemService = async (id) => {
  const item = await findAttributeItemByIdRepo(id);

  if (!item) {
    throw new Error("ATTRIBUTE_ITEM_NOT_FOUND");
  }

  await deleteAttributeItemRepo(id);

  if (item.image) deleteUploadedFile("attributes", item.image);

  return true;
};
