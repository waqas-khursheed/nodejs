import Faq from "../../../database/models/Faq.js";
import FaqCategory from "../../../database/models/FaqCategory.js";

const detailIncludes = [{ model: FaqCategory, as: "category" }];

export const createFaqRepo = async (data) => {
  return await Faq.create(data);
};

export const findFaqByIdRepo = async (id) => {
  return await Faq.findByPk(id, { include: detailIncludes });
};

export const findAllFaqsRepo = async ({ where, limit, offset }) => {
  return await Faq.findAndCountAll({
    where,
    limit,
    offset,
    include: detailIncludes,
    order: [["id", "DESC"]],
  });
};

export const updateFaqRepo = async (id, data) => {
  await Faq.update(data, { where: { id } });
  return await findFaqByIdRepo(id);
};

export const deleteFaqRepo = async (id) => {
  return await Faq.destroy({ where: { id } });
};
