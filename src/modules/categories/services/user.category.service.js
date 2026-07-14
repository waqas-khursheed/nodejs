import {
  findActiveTopCategoriesRepo,
  findActiveChildCategoriesRepo,
  findActiveChildCategoriesForParentsRepo,
  findActiveCategoryBySlugRepo,
} from "../repositories/user.category.repository.js";

export const getCategoryTreeService = async () => {
  const topCategories = await findActiveTopCategoriesRepo();

  const allChildren = await findActiveChildCategoriesForParentsRepo(
    topCategories.map((category) => category.id)
  );

  const childrenByParentId = new Map();
  for (const child of allChildren) {
    const list = childrenByParentId.get(child.parent_id) ?? [];
    list.push(child);
    childrenByParentId.set(child.parent_id, list);
  }

  return topCategories.map((category) => ({
    ...category.toJSON(),
    children: childrenByParentId.get(category.id) ?? [],
  }));
};

export const getCategoryBySlugService = async (slug) => {
  const category = await findActiveCategoryBySlugRepo(slug);
  if (!category) throw new Error("CATEGORY_NOT_FOUND");

  const children = await findActiveChildCategoriesRepo(category.id);
  return { ...category.toJSON(), children };
};
