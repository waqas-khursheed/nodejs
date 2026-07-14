import Review from "../../../database/models/Review.js";
import User from "../../../database/models/User.js";
import Order from "../../../database/models/Order.js";
import OrderDetail from "../../../database/models/OrderDetail.js";

export const createReviewRepo = async (data) => {
  return await Review.create(data);
};

export const findUserReviewForProductRepo = async (userId, productId) => {
  return await Review.findOne({ where: { user_id: userId, product_id: productId } });
};

// "Verified purchase" = the user has at least one paid order containing
// this product.
export const hasPaidOrderForProductRepo = async (userId, productId) => {
  const match = await OrderDetail.findOne({
    where: { product_id: productId },
    include: [
      {
        model: Order,
        as: "order",
        where: { user_id: userId, payment_status: "paid" },
        attributes: [],
      },
    ],
  });

  return Boolean(match);
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
