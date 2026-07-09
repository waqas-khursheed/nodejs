import Review from "../../../database/models/Review.js";
import Product from "../../../database/models/Product.js";
import User from "../../../database/models/User.js";

const detailIncludes = [
  { model: Product, as: "product", attributes: ["id", "title", "slug", "featured_image"] },
  { model: User, as: "user", attributes: ["id", "first_name", "last_name", "email"] },
];

export const findReviewByIdRepo = async (id) => {
  return await Review.findByPk(id, { include: detailIncludes });
};

export const findAllReviewsRepo = async ({ where, limit, offset }) => {
  return await Review.findAndCountAll({
    where,
    limit,
    offset,
    include: detailIncludes,
    order: [["id", "DESC"]],
  });
};

export const updateReviewStatusRepo = async (id, status) => {
  await Review.update({ status }, { where: { id } });
  return await findReviewByIdRepo(id);
};

export const deleteReviewRepo = async (id) => {
  return await Review.destroy({ where: { id } });
};
