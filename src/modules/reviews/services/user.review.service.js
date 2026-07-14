import {
  createReviewRepo,
  findUserReviewForProductRepo,
  findApprovedReviewsByProductRepo,
  hasPaidOrderForProductRepo,
} from "../repositories/user.review.repository.js";
import Product from "../../../database/models/Product.js";
import Review from "../../../database/models/Review.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import { notifyAdmins } from "../../../shared/services/notifier.service.js";

export const createReviewService = async (user, data) => {
  const { product_id, review, rate } = data;

  const product = await Product.findByPk(product_id);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  const existing = await findUserReviewForProductRepo(user.id, product_id);
  if (existing) throw new Error("ALREADY_REVIEWED");

  const isVerifiedPurchase = await hasPaidOrderForProductRepo(user.id, product_id);

  const created = await createReviewRepo({
    product_id,
    review,
    rate,
    user_id: user.id,
    name: [user.first_name, user.last_name].filter(Boolean).join(" "),
    status: 0,
    is_verified_purchase: isVerifiedPurchase ? 1 : 0,
  });

  notifyAdmins({
    title: "New review submitted",
    description: `${product.title} received a new ${rate}-star review awaiting moderation`,
    tableName: "reviews",
    rowId: created.id,
  }).catch(() => {});

  return await Review.findByPk(created.id);
};

export const getProductReviewsService = async (productId, query) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  const { page, limit, offset } = getPagination(query);
  const { count, rows } = await findApprovedReviewsByProductRepo({ productId, limit, offset });

  return { reviews: rows, meta: buildPaginationMeta({ count, page, limit }) };
};
