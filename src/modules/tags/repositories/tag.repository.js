import { Op } from "sequelize";
import ProductTag from "../../../database/models/ProductTag.js";
import AssignTagToProduct from "../../../database/models/AssignTagToProduct.js";
import AssignTagToTag from "../../../database/models/AssignTagToTag.js";
import Product from "../../../database/models/Product.js";

export const createTagRepo = async (data) => {
  return await ProductTag.create(data);
};

export const findTagByNameRepo = async (name, excludeId = null) => {
  const where = { name };
  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }
  return await ProductTag.findOne({ where });
};

export const findTagByIdRepo = async (id) => {
  return await ProductTag.findByPk(id);
};

export const findAllTagsRepo = async ({ where, limit, offset }) => {
  return await ProductTag.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });
};

export const updateTagRepo = async (id, data) => {
  await ProductTag.update(data, { where: { id } });
  return await findTagByIdRepo(id);
};

export const deleteTagRepo = async (id) => {
  return await ProductTag.destroy({ where: { id } });
};

export const countProductsForTagRepo = async (tagId) => {
  return await AssignTagToProduct.count({ where: { tag_id: tagId } });
};

// ---- Product <-> Tag assignment (assign_tag_to_products) ----

export const findTagIdsForProductRepo = async (productId) => {
  const rows = await AssignTagToProduct.findAll({
    where: { product_id: productId },
    include: [{ model: ProductTag, as: "tag" }],
    order: [["id", "ASC"]],
  });
  return rows;
};

export const syncProductTagsRepo = async (productId, tagIds) => {
  await AssignTagToProduct.destroy({ where: { product_id: productId } });

  if (tagIds && tagIds.length > 0) {
    const rows = tagIds.map((tag_id) => ({ product_id: productId, tag_id }));
    await AssignTagToProduct.bulkCreate(rows);
  }

  return await findTagIdsForProductRepo(productId);
};

export const findTagsByIdsRepo = async (tagIds) => {
  return await ProductTag.findAll({ where: { id: tagIds } });
};

export const findProductByIdRepo = async (id) => {
  return await Product.findByPk(id);
};

// ---- Related search terms per tag (assign_tag_to_tags) ----

export const findMetaTagsForTagRepo = async (tagId) => {
  return await AssignTagToTag.findAll({ where: { tag_id: tagId }, order: [["id", "ASC"]] });
};

export const syncMetaTagsRepo = async (tagId, metaTags) => {
  await AssignTagToTag.destroy({ where: { tag_id: tagId } });

  if (metaTags && metaTags.length > 0) {
    const rows = metaTags.map((meta_tag) => ({ tag_id: tagId, meta_tag }));
    await AssignTagToTag.bulkCreate(rows);
  }

  return await findMetaTagsForTagRepo(tagId);
};
