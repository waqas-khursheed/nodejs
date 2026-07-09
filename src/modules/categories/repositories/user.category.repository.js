import ProductCategory from "../../../database/models/ProductCategory.js";

export const findActiveTopCategoriesRepo = async () => {
  return await ProductCategory.findAll({
    where: { status: 1, parent_id: 0 },
    order: [["order_by", "ASC"], ["id", "DESC"]],
  });
};

export const findActiveChildCategoriesRepo = async (parentId) => {
  return await ProductCategory.findAll({
    where: { status: 1, parent_id: parentId },
    order: [["order_by", "ASC"], ["id", "DESC"]],
  });
};

export const findActiveCategoryBySlugRepo = async (slug) => {
  return await ProductCategory.findOne({ where: { slug, status: 1 } });
};
