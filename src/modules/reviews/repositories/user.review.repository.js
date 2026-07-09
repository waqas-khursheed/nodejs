import Review from "../../../database/models/Review.js";
import User from "../../../database/models/User.js";

export const createReviewRepo = async (data) => {
  return await Review.create(data);
};

export const findUserReviewForProductRepo = async (userId, productId) => {
  return await Review.findOne({ where: { user_id: userId, product_id: productId } });
};

export const findApprovedReviewsByProductRepo = async ({ productId, limit, offset }) => {
  return await Review.findAndCountAll({
    where: { product_id: productId, status: 1 },
    include: [{ model: User, as: "user", attributes: ["id", "first_name", "last_name"] }],
    limit,
    offset,
    order: [["id", "DESC"]],
  });
};
