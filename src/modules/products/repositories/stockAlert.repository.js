import StockAlert from "../../../database/models/StockAlert.js";
import Product from "../../../database/models/Product.js";
import Stock from "../../../database/models/Stock.js";
import AttributeItem from "../../../database/models/AttributeItem.js";

const detailIncludes = [
  { model: Product, as: "product", attributes: ["id", "title"] },
  {
    model: Stock,
    as: "stock",
    attributes: ["id"],
    include: [
      { model: AttributeItem, as: "color", attributes: ["id", "title"] },
      { model: AttributeItem, as: "size", attributes: ["id", "title"] },
      { model: AttributeItem, as: "fitting", attributes: ["id", "title"] },
    ],
  },
];

// findOrCreate keeps re-submitting the same email for the same product/variant
// idempotent instead of piling up duplicate pending rows.
export const createStockAlertRepo = async (data) => {
  const [alert] = await StockAlert.findOrCreate({
    where: { product_id: data.product_id, stock_id: data.stock_id ?? null, email: data.email },
    defaults: data,
  });
  return alert;
};

export const findPendingStockAlertsRepo = async (productId, stockId = null) => {
  return await StockAlert.findAll({
    where: { product_id: productId, stock_id: stockId, notified_at: null },
  });
};

export const markStockAlertsNotifiedRepo = async (ids) => {
  if (ids.length === 0) return;
  await StockAlert.update({ notified_at: new Date() }, { where: { id: ids } });
};

export const findAllStockAlertsRepo = async ({ where, limit, offset }) => {
  return await StockAlert.findAndCountAll({
    where,
    limit,
    offset,
    include: detailIncludes,
    order: [["id", "DESC"]],
  });
};

export const findStockAlertByIdRepo = async (id) => {
  return await StockAlert.findByPk(id);
};

export const deleteStockAlertRepo = async (id) => {
  return await StockAlert.destroy({ where: { id } });
};
