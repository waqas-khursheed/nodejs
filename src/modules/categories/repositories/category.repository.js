import ProductCategory from "../../../database/models/ProductCategory.js";

export const createCategoryRepo = async (data) => {
  return await ProductCategory.create(data);
};

export const findCategoryByTitleRepo = async (title) => {
  return await ProductCategory.findOne({
    where: { title },
  });
};