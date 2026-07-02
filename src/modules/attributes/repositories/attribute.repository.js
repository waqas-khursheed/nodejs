import { Op } from "sequelize";
import ProductAttribute from "../../../database/models/ProductAttribute.js";
import AttributeItem from "../../../database/models/AttributeItem.js";

export const createAttributeRepo = async (data) => {
  return await ProductAttribute.create(data);
};

export const findAttributeByTitleRepo = async (attribute_title, excludeId = null) => {
  const where = { attribute_title };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  return await ProductAttribute.findOne({ where });
};

export const findAttributeByIdRepo = async (id, withItems = false) => {
  return await ProductAttribute.findByPk(id, {
    include: withItems ? [{ model: AttributeItem, as: "attributeItems" }] : [],
  });
};

export const findAllAttributesRepo = async ({ where, limit, offset }) => {
  return await ProductAttribute.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });
};

export const updateAttributeRepo = async (id, data) => {
  await ProductAttribute.update(data, { where: { id } });
  return await findAttributeByIdRepo(id);
};

export const deleteAttributeRepo = async (id) => {
  return await ProductAttribute.destroy({ where: { id } });
};

export const countAttributeItemsRepo = async (attribute_id) => {
  return await AttributeItem.count({ where: { attribute_id } });
};
