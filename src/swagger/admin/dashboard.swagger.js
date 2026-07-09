/**
 * @openapi
 * components:
 *   schemas:
 *     DashboardOverview:
 *       type: object
 *       properties:
 *         totalOrders: { type: integer, example: 128 }
 *         totalRevenue: { type: number, example: 452300.5 }
 *         pendingOrders: { type: integer, example: 12 }
 *         todayOrders: { type: integer, example: 5 }
 *         todayRevenue: { type: number, example: 18500 }
 *         totalProducts: { type: integer, example: 340 }
 *         totalUsers: { type: integer, example: 980 }
 *         activeUsers: { type: integer, example: 910 }
 *     OrderStats:
 *       type: object
 *       properties:
 *         statusCounts:
 *           type: array
 *           items:
 *             type: object
 *             properties: { status: { type: integer }, count: { type: integer } }
 *         paymentStatusCounts:
 *           type: array
 *           items:
 *             type: object
 *             properties: { paymentStatus: { type: string }, count: { type: integer } }
 *     TopProduct:
 *       type: object
 *       properties:
 *         product:
 *           type: object
 *           properties:
 *             id: { type: integer }
 *             title: { type: string }
 *             featured_image: { type: string }
 *         totalQuantitySold: { type: integer, example: 240 }
 *         totalRevenue: { type: number, example: 96000 }
 *     SalesReportRow:
 *       type: object
 *       properties:
 *         date: { type: string, format: date, example: "2026-07-01" }
 *         orderCount: { type: integer, example: 8 }
 *         revenue: { type: number, example: 24500 }
 */

/**
 * @openapi
 * /api/admin/dashboard/overview:
 *   get:
 *     tags: [Admin Dashboard]
 *     summary: Get top-level KPI overview (orders, revenue, products, users)
 *     description: totalRevenue/todayRevenue only sum orders with payment_status="paid".
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Overview fetched
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/DashboardOverview" } }
 */

/**
 * @openapi
 * /api/admin/dashboard/order-stats:
 *   get:
 *     tags: [Admin Dashboard]
 *     summary: Get order counts grouped by status and payment status
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Order stats fetched
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/OrderStats" } }
 */

/**
 * @openapi
 * /api/admin/dashboard/top-products:
 *   get:
 *     tags: [Admin Dashboard]
 *     summary: Get the best-selling products by quantity sold
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10, minimum: 1, maximum: 50 }
 *     responses:
 *       200:
 *         description: Top products fetched
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         topProducts:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/TopProduct" }
 */

/**
 * @openapi
 * /api/admin/dashboard/sales-report:
 *   get:
 *     tags: [Admin Dashboard]
 *     summary: Get a daily sales report over a date range
 *     description: Only includes orders with payment_status="paid". Omit from/to for all-time.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date, example: "2026-06-01" }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date, example: "2026-07-01" }
 *     responses:
 *       200:
 *         description: Sales report fetched
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         salesReport:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/SalesReportRow" }
 */
