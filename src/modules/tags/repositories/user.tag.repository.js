import ProductTag from "../../../database/models/ProductTag.js";

// ProductTag has no status column (unlike Brand/Category) — every tag is
// always public, there's no admin-side active/inactive toggle for it.
export const findAllTagsRepo = async () => {
  return await ProductTag.findAll({ order: [["name", "ASC"]] });
};

export const findTagBySlugRepo = async (slug) => {
  return await ProductTag.findOne({ where: { slug } });
};
