import {
  getOrdersOverviewRepo,
  getCatalogOverviewRepo,
  getOrderStatusCountsRepo,
  getPaymentStatusCountsRepo,
  getTopProductsRepo,
  getSalesReportRepo,
} from "../repositories/dashboard.repository.js";

export const getDashboardOverviewService = async () => {
  const [orders, catalog] = await Promise.all([
    getOrdersOverviewRepo(),
    getCatalogOverviewRepo(),
  ]);

  return { ...orders, ...catalog };
};

export const getOrderStatsService = async () => {
  const [statusCounts, paymentStatusCounts] = await Promise.all([
    getOrderStatusCountsRepo(),
    getPaymentStatusCountsRepo(),
  ]);

  return { statusCounts, paymentStatusCounts };
};

export const getTopProductsService = async (query) => {
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 50);
  return await getTopProductsRepo(limit);
};

export const getSalesReportService = async (query) => {
  return await getSalesReportRepo({ from: query.from, to: query.to });
};
