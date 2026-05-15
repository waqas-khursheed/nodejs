import {createCategoryRepo,findCategoryByTitleRepo} from "../repositories/category.repository.js";
import { slugify } from "../../../shared/helpers/helpers.js";

export const createCategoryService = async (data) => {
  const {
    title,
    description,
    meta_title,
    meta_keywords,
    meta_desc,
    parent_id,
    status,
    image,
    icon,
  } = data;

  // 1. check duplicate
  const exists = await findCategoryByTitleRepo(title);

  if (exists) {
    throw new Error("CATEGORY_ALREADY_EXISTS");
  }

  // 2. prepare data
  const categoryData = {
    title: title.toLowerCase(),
    slug: slugify(title),
    description,
    meta_title,
    meta_keywords,
    meta_desc,
    parent_id: parent_id || 0,
    status,
    image,
    icon,
  };

  const category = await createCategoryRepo(categoryData);

  return category;
};