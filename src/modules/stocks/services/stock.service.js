import AssignAttrToProduct from "../../../database/models/AssignAttrToProduct.js";
import {
  createStockRepo,
  findStockByIdRepo,
  findAllStocksRepo,
  updateStockRepo,
  deleteStockRepo,
} from "../repositories/stock.repository.js";
import { findProductByIdRepo } from "../../products/repositories/product.repository.js";
import { notifyStockAlertsService } from "../../products/services/stockAlertNotifier.service.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

// Creating/editing a Stock row is the only place an admin picks which
// attribute *values* (color_id/size_id/fitting_id) a variant uses — but
// nothing previously recorded that assignment in assign_attr_to_products,
// which is the table the storefront's variant selector actually reads
// (backed/src/modules/products/repositories/user.product.repository.js).
// Without this, a product could have real Stock rows with real prices/qty
// and still show zero variant buttons to shop with. Find-or-create keeps
// this idempotent across repeated stock edits for the same product/value.
const syncAssignedAttributes = async (productId, stock) => {
  const attributeItemIds = [stock.color_id, stock.size_id, stock.fitting_id].filter(Boolean);

  for (const attributeItemId of attributeItemIds) {
    await AssignAttrToProduct.findOrCreate({
      where: { product_id: productId, attribute_id: attributeItemId },
      defaults: { product_id: productId, attribute_id: attributeItemId, in_stock: 1, with_product: 0 },
    });
  }
};

export const createStockService = async (data) => {
  const { product_id } = data;

  const product = await findProductByIdRepo(product_id);
  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }
  // Only variant products (is_variation=1) are ever read from `stocks` at
  // checkout/display time (see checkout.service.js's decrementStockOrProduct
  // and the storefront's ProductPurchasePanel) — a Stock row on a plain
  // product would save successfully but never be seen by a shopper.
  if (!product.is_variation) {
    throw new Error("PRODUCT_NOT_VARIANT");
  }

  const stock = await createStockRepo(data);
  await syncAssignedAttributes(product_id, stock);
  return await findStockByIdRepo(stock.id);
};

export const getStocksService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.product_id) {
    where.product_id = query.product_id;
  }

  const { count, rows } = await findAllStocksRepo({ where, limit, offset, search: query.search });

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
    if (!product.is_variation) {
      throw new Error("PRODUCT_NOT_VARIANT");
    }
  }

  const wasOutOfStock = stock.stock_qty === 0;
  const updated = await updateStockRepo(id, data);
  await syncAssignedAttributes(data.product_id ?? stock.product_id, updated);

  if (wasOutOfStock && updated.stock_qty > 0) {
    notifyStockAlertsService(updated.product_id, updated.id).catch(() => {});
  }

  return updated;
};

export const deleteStockService = async (id) => {
  const stock = await findStockByIdRepo(id);

  if (!stock) {
    throw new Error("STOCK_NOT_FOUND");
  }

  await deleteStockRepo(id);

  return true;
};
