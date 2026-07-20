import Product from "../../../database/models/Product.js";
import { sendMail } from "../../../shared/utils/mailer.js";
import { findPendingStockAlertsRepo, markStockAlertsNotifiedRepo } from "../repositories/stockAlert.repository.js";

// Called whenever a product/variant's quantity moves from 0 to a positive
// number (see product.service.js and stocks/services/stock.service.js) —
// emails everyone still waiting on a "notify me" subscription for that exact
// product/variant, then marks them notified so they don't get emailed again
// on the next restock. Fire-and-forget: a mail failure here should never
// block the admin's stock/quantity update.
export const notifyStockAlertsService = async (productId, stockId = null) => {
  const alerts = await findPendingStockAlertsRepo(productId, stockId);
  if (alerts.length === 0) return;

  const product = await Product.findByPk(productId);
  if (!product) return;

  for (const alert of alerts) {
    sendMail({
      to: alert.email,
      subject: `${product.title} is back in stock!`,
      html: `<p>Good news — <strong>${product.title}</strong> is back in stock and ready to order.</p>`,
    }).catch(() => {});
  }

  await markStockAlertsNotifiedRepo(alerts.map((a) => a.id));
};
