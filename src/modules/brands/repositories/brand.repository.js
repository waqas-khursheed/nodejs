import { Op } from "sequelize";
import Brand from "../../../database/models/Brand.js";

export const createBrandRepo = async (data) => {
  return await Brand.create(data);
};

export const findBrandByTitleRepo = async (title, excludeId = null) => {
  const where = { title };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  return await Brand.findOne({ where });
};

export const findBrandByIdRepo = async (id) => {
  return await Brand.findByPk(id);
};

export const findAllBrandsRepo = async ({ where, limit, offset }) => {
  return await Brand.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });
};

export const updateBrandRepo = async (id, data) => {
  await Brand.update(data, { where: { id } });
  return await findBrandByIdRepo(id);
};

export const deleteBrandRepo = async (id) => {
  return await Brand.destroy({ where: { id } });
};
