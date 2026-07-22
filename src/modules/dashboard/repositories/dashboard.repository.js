import { Op, fn, col, literal } from "sequelize";
import Order from "../../../database/models/Order.js";
import OrderDetail from "../../../database/models/OrderDetail.js";
import Product from "../../../database/models/Product.js";
import User from "../../../database/models/User.js";

const PAID_WHERE = { payment_status: "paid" };

export const getOrdersOverviewRepo = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [totalOrders, totalRevenue, pendingOrders, todayOrders, todayRevenue] = await Promise.all([
    Order.count(),
    Order.sum("grand_total", { where: PAID_WHERE }),
    Order.count({ where: { payment_status: "pending" } }),
    Order.count({ where: { created_at: { [Op.gte]: startOfDay } } }),
    Order.sum("grand_total", { where: { ...PAID_WHERE, created_at: { [Op.gte]: startOfDay } } }),
  ]);

  return {
    totalOrders,
    totalRevenue: totalRevenue || 0,
    pendingOrders,
    todayOrders,
    todayRevenue: todayRevenue || 0,
  };
};

export const getCatalogOverviewRepo = async () => {
  const [totalProducts, totalUsers, activeUsers] = await Promise.all([
    Product.count(),
    User.count(),
    User.count({ where: { is_active: 1 } }),
  ]);

  return { totalProducts, totalUsers, activeUsers };
};

export const getOrderStatusCountsRepo = async () => {
  const rows = await Order.findAll({
    attributes: ["status", [fn("COUNT", col("id")), "count"]],
    group: ["status"],
    raw: true,
  });

  return rows.map((r) => ({ status: r.status, count: Number(r.count) }));
};

export const getPaymentStatusCountsRepo = async () => {
  const rows = await Order.findAll({
    attributes: ["payment_status", [fn("COUNT", col("id")), "count"]],
    group: ["payment_status"],
    raw: true,
  });

  return rows.map((r) => ({ paymentStatus: r.payment_status, count: Number(r.count) }));
};

export const getTopProductsRepo = async (limit) => {
  const rows = await OrderDetail.findAll({
    attributes: [
      "product_id",
      [fn("SUM", col("OrderDetail.quantity")), "totalQuantitySold"],
      [fn("SUM", col("OrderDetail.total")), "totalRevenue"],
    ],
    include: [{ model: Product, as: "product", attributes: ["id", "title", "featured_image"] }],
    group: ["product_id", "product.id"],
    order: [[literal("totalQuantitySold"), "DESC"]],
    limit,
    subQuery: false,
  });

  return rows.map((r) => ({
    product: r.product,
    totalQuantitySold: Number(r.get("totalQuantitySold")),
    totalRevenue: Number(r.get("totalRevenue")),
  }));
};

export const getSalesReportRepo = async ({ from, to }) => {
  const where = { ...PAID_WHERE };
  if (from || to) {
    where.created_at = {};
    if (from) where.created_at[Op.gte] = from;
    if (to) where.created_at[Op.lte] = to;
  }

  const rows = await Order.findAll({
    attributes: [
      [fn("DATE", col("created_at")), "date"],
      [fn("COUNT", col("id")), "orderCount"],
      [fn("SUM", col("grand_total")), "revenue"],
    ],
    where,
    group: [literal("date")],
    order: [[literal("date"), "ASC"]],
    raw: true,
  });

  return rows.map((r) => ({
    date: r.date,
    orderCount: Number(r.orderCount),
    revenue: Number(r.revenue) || 0,
  }));
};
