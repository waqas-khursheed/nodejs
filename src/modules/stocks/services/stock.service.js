import {
  createStockRepo,
  findStockByIdRepo,
  findAllStocksRepo,
  updateStockRepo,
  deleteStockRepo,
} from "../repositories/stock.repository.js";
import { findProductByIdRepo } from "../../products/repositories/product.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const createStockService = async (data) => {
  const { product_id } = data;

  const product = await findProductByIdRepo(product_id);
  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  const stock = await createStockRepo(data);
  return await findStockByIdRepo(stock.id);
};

export const getStocksService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.product_id) {
    where.product_id = query.product_id;
  }

  const { count, rows } = await findAllStocksRepo({ where, limit, offset });

  return {
    stocks: rows,
    meta: buildPaginationMeta({ count, page, limit }),
  };
};

export const getStockByIdService = async (id) => {
  const stock = await findStockByIdRepo(id);

  if (!stock) {
    throw new Error("STOCK_NOT_FOUND");
  }

  return stock;
};

export const updateStockService = async (id, data) => {
  const stock = await findStockByIdRepo(id);

  if (!stock) {
    throw new Error("STOCK_NOT_FOUND");
  }

  if (data.product_id) {
    const product = await findProductByIdRepo(data.product_id);
    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
  }

  return await updateStockRepo(id, data);
};

export const deleteStockService = async (id) => {
  const stock = await findStockByIdRepo(id);

  if (!stock) {
    throw new Error("STOCK_NOT_FOUND");
  }

  await deleteStockRepo(id);

  return true;
};
