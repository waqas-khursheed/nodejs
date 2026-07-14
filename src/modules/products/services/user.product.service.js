import { Op, fn, col } from "sequelize";
import {
  findActiveProductsRepo,
  findActiveProductBySlugRepo,
  findRelatedProductsRepo,
  findStockForVariationRepo,
} from "../repositories/user.product.repository.js";
import Review from "../../../database/models/Review.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import { buildProductSearchCondition } from "../../../shared/utils/fullTextSearch.js";

const SORT_MAP = {
  newest: [["created_at", "DESC"]],
  price_asc: [["price", "ASC"]],
  price_desc: [["price", "DESC"]],
  best_selling: [["sold", "DESC"]],
};

export const getProductsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = { status: 1 };

  if (query.search) {
    const searchCondition = buildProductSearchCondition(query.search);
    // Very short/stopword-only queries can produce no usable boolean-mode
    // terms — fall back to LIKE for those rather than matching everything.
    where[Op.and] = [...(where[Op.and] ?? []), searchCondition ?? { title: { [Op.like]: `%${query.search}%` } }];
  }

  if (query.min_price || query.max_price) {
    where.price = {};
    if (query.min_price) where.price[Op.gte] = query.min_price;
    if (query.max_price) where.price[Op.lte] = query.max_price;
  }

  if (query.new_arrival !== undefined && query.new_arrival !== "") {
    where.new_arrival = query.new_arrival;
  }

  if (query.best_seller !== undefined && query.best_seller !== "") {
    where.best_seller = query.best_seller;
  }

  if (query.sale === "1" || query.sale === 1) {
    where.d_percentage = { [Op.gt]: 0 };
  }

  const order = SORT_MAP[query.sort] || SORT_MAP.newest;

  const { count, rows } = await findActiveProductsRepo({
    where,
    limit,
    offset,
    order,
    categorySlug: query.category,
    brandSlug: query.brand,
    tagSlug: query.tag,
  });

  return { products: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

const getReviewStats = async (productId) => {
  const stats = await Review.findOne({
    where: { product_id: productId, status: 1 },
    attributes: [
      [fn("COUNT", col("id")), "count"],
      [fn("AVG", col("rate")), "average"],
    ],
    raw: true,
  });

  return {
    count: Number(stats?.count || 0),
    average: stats?.average ? Number(Number(stats.average).toFixed(1)) : 0,
  };
};

export const getProductBySlugService = async (slug) => {
  const product = await findActiveProductBySlugRepo(slug);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  const reviewStats = await getReviewStats(product.id);

  return { ...product.toJSON(), reviewStats };
};

export const getRelatedProductsService = async (slug, limit = 8) => {
  const product = await findActiveProductBySlugRepo(slug);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  const categoryIds = product.assignCatToProducts.map((a) => a.category_id);

  return await findRelatedProductsRepo({ productId: product.id, categoryIds, limit });
};

export const checkStockService = async (slug, variation) => {
  const product = await findActiveProductBySlugRepo(slug);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");

  const stock = await findStockForVariationRepo(product.id, variation);
  if (!stock) throw new Error("STOCK_NOT_FOUND");

  return stock;
};
