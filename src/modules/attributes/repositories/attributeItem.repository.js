import { Op } from "sequelize";
import AttributeItem from "../../../database/models/AttributeItem.js";

export const createAttributeItemRepo = async (data) => {
  return await AttributeItem.create(data);
};

export const findAttributeItemByTitleRepo = async (title, attribute_id, excludeId = null) => {
  const where = { title, attribute_id };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  return await AttributeItem.findOne({ where });
};

export const findAttributeItemByIdRepo = async (id) => {
  return await AttributeItem.findByPk(id);
};

export const findAllAttributeItemsRepo = async ({ where, limit, offset }) => {
  return await AttributeItem.findAndCountAll({
    where,
    limit,
    offset,
    order: [["order_by", "ASC"], ["id", "DESC"]],
  });
};

export const updateAttributeItemRepo = async (id, data) => {
  await AttributeItem.update(data, { where: { id } });
  return await findAttributeItemByIdRepo(id);
};

export const deleteAttributeItemRepo = async (id) => {
  return await AttributeItem.destroy({ where: { id } });
};
