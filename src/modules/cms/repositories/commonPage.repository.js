import { Op } from "sequelize";
import CommonPage from "../../../database/models/CommonPage.js";

export const createCommonPageRepo = async (data) => {
  return await CommonPage.create(data);
};

export const findCommonPageByIdRepo = async (id) => {
  return await CommonPage.findByPk(id);
};

export const findCommonPageByNameRepo = async (page_name, excludeId) => {
  const where = { page_name };
  if (excludeId) where.id = { [Op.ne]: excludeId };
  return await CommonPage.findOne({ where });
};

export const findAllCommonPagesRepo = async ({ where, limit, offset }) => {
  return await CommonPage.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });
};

export const updateCommonPageRepo = async (id, data) => {
  await CommonPage.update(data, { where: { id } });
  return await findCommonPageByIdRepo(id);
};

export const deleteCommonPageRepo = async (id) => {
  return await CommonPage.destroy({ where: { id } });
};
