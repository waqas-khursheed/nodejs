import { Op } from "sequelize";
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

export const findAllReviewsRepo = async ({ where, limit, offset, search }) => {
  // Matches against the reviewed product's title — a review has no name of
  // its own on the admin list, so "search" only makes sense against what the
  // admin recognizes the row by. `required: true` turns this into an INNER
  // JOIN so the WHERE actually filters (a LEFT JOIN would still return every
  // review and just leave `product` fields null on a non-match).
  const include = [
    {
      model: Product,
      as: "product",
      attributes: ["id", "title", "slug", "featured_image"],
      where: search ? { title: { [Op.like]: `%${search}%` } } : undefined,
      required: Boolean(search),
    },
    { model: User, as: "user", attributes: ["id", "first_name", "last_name", "email"] },
  ];

  return await Review.findAndCountAll({
    where,
    limit,
    offset,
    include,
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
