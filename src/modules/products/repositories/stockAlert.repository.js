import StockAlert from "../../../database/models/StockAlert.js";

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
