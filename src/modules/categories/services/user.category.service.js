import {
  findActiveTopCategoriesRepo,
  findActiveChildCategoriesRepo,
  findActiveCategoryBySlugRepo,
} from "../repositories/user.category.repository.js";

export const getCategoryTreeService = async () => {
  const topCategories = await findActiveTopCategoriesRepo();

  const tree = await Promise.all(
    topCategories.map(async (category) => {
      const children = await findActiveChildCategoriesRepo(category.id);
      return { ...category.toJSON(), children };
    })
  );

  return tree;
};

export const getCategoryBySlugService = async (slug) => {
  const category = await findActiveCategoryBySlugRepo(slug);
  if (!category) throw new Error("CATEGORY_NOT_FOUND");

  const children = await findActiveChildCategoriesRepo(category.id);
  return { ...category.toJSON(), children };
};
