import { sequelize } from "../../../config/db.js";
import Product from "../../../database/models/Product.js";
import Stock from "../../../database/models/Stock.js";

// Reverses the stock/quantity decrement applied at checkout, for every line
// item on an order. Must run inside the caller's transaction so a partial
// failure can't leave some variants restored and others not.
export const restoreStockForOrderDetails = async (orderDetails, transaction) => {
  for (const detail of orderDetails) {
    const stock = await Stock.findOne({
      where: {
        product_id: detail.product_id,
        color_id: detail.color_id,
        size_id: detail.size_id,
        fitting_id: detail.fitting_id,
      },
      transaction,
    });

    if (stock) {
      // NULL stock_qty means "untracked/unlimited" — NULL + N is still NULL
      // in SQL, so this is naturally a no-op for those rows.
      await Stock.update(
        { stock_qty: sequelize.literal(`stock_qty + ${Number(detail.quantity)}`) },
        { where: { id: stock.id }, transaction }
      );
    } else {
      await Product.update(
        {
          quantity: sequelize.literal(`quantity + ${Number(detail.quantity)}`),
          sold: sequelize.literal(`GREATEST(sold - ${Number(detail.quantity)}, 0)`),
        },
        { where: { id: detail.product_id }, transaction }
      );
    }
  }
};
