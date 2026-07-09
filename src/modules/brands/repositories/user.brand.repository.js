import Brand from "../../../database/models/Brand.js";

export const findActiveBrandsRepo = async () => {
  return await Brand.findAll({
    where: { status: 1 },
    order: [["title", "ASC"]],
  });
};

export const findActiveBrandBySlugRepo = async (slug) => {
  return await Brand.findOne({ where: { slug, status: 1 } });
};
