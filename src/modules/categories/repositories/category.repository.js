import { Op } from "sequelize";
import ProductCategory from "../../../database/models/ProductCategory.js";

export const createCategoryRepo = async (data) => {
  return await ProductCategory.create(data);
};

export const findCategoryByTitleRepo = async (title, excludeId = null) => {
  const where = { title };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  return await ProductCategory.findOne({ where });
};

export const findCategoryByIdRepo = async (id) => {
  return await ProductCategory.findByPk(id);
};

export const findAllCategoriesRepo = async ({ where, limit, offset }) => {
  return await ProductCategory.findAndCountAll({
    where,
    limit,
    offset,
    order: [["order_by", "ASC"], ["id", "DESC"]],
  });
};

export const findChildCategoriesRepo = async (parentId) => {
  return await ProductCategory.findAll({ where: { parent_id: parentId } });
};

export const updateCategoryRepo = async (id, data) => {
  await ProductCategory.update(data, { where: { id } });
  return await findCategoryByIdRepo(id);
};

export const deleteCategoryRepo = async (id) => {
  return await ProductCategory.destroy({ where: { id } });
};
