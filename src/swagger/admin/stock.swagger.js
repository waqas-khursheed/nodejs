/**
 * @openapi
 * components:
 *   schemas:
 *     Stock:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         product_id: { type: integer, example: 1 }
 *         stock_qty: { type: integer, nullable: true, example: 20 }
 *         stock_dis_price: { type: integer, example: 0 }
 *         stock_dis_percentage: { type: integer, example: 0 }
 *         stock_dis_from_date: { type: string, format: date, nullable: true }
 *         stock_dis_to_date: { type: string, format: date, nullable: true }
 *         stock_price: { type: integer, nullable: true }
 *         weight: { type: number, nullable: true }
 *         color_id: { type: integer, nullable: true }
 *         size_id: { type: integer, nullable: true }
 *         fitting_id: { type: integer, nullable: true }
 *         created_at: { type: string, format: date-time }
 *         product: { $ref: "#/components/schemas/Product" }
 */

/**
 * @openapi
 * /api/admin/stock/create:
 *   post:
 *     tags: [Admin Stock]
 *     summary: Create a stock/variation entry for a product
 *     description: >
 *       color_id/size_id/fitting_id reference attribute item IDs (e.g. from the
 *       "Size" or "Color" attribute) but are not FK-enforced at the DB level.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id]
 *             properties:
 *               product_id: { type: integer, example: 1 }
 *               stock_qty: { type: integer, example: 20 }
 *               stock_dis_price: { type: number, example: 0 }
 *               stock_dis_percentage: { type: number, example: 0 }
 *               stock_dis_from_date: { type: string, format: date }
 *               stock_dis_to_date: { type: string, format: date }
 *               stock_price: { type: number }
 *               weight: { type: number }
 *               color_id: { type: integer }
 *               size_id: { type: integer }
 *               fitting_id: { type: integer }
 *     responses:
 *       201:
 *         description: Stock created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Stock" }
 *       422:
 *         description: Selected product does not exist
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/stock:
 *   get:
 *     tags: [Admin Stock]
 *     summary: List stock entries (optionally filtered by product)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: product_id
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of stock entries
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
 *                         stocks:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Stock" }
 *                         meta:
 *                           type: object
 *                           properties:
 *                             total: { type: integer }
 *                             page: { type: integer }
 *                             limit: { type: integer }
 *                             totalPages: { type: integer }
 */

/**
 * @openapi
 * /api/admin/stock/{id}:
 *   get:
 *     tags: [Admin Stock]
 *     summary: Get a single stock entry
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Stock entry found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Stock" }
 *       404:
 *         description: Stock entry not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Stock]
 *     summary: Update a stock entry
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock_qty: { type: integer }
 *               stock_price: { type: number }
 *               stock_dis_percentage: { type: number }
 *     responses:
 *       200:
 *         description: Stock updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Stock" }
 *       404:
 *         description: Stock entry not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Stock]
 *     summary: Delete a stock entry
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Stock deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Stock entry not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
