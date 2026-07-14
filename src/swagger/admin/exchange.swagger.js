/**
 * @openapi
 * components:
 *   schemas:
 *     Exchange:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         order_id: { type: integer, nullable: true }
 *         order_number: { type: string }
 *         customer_name: { type: string }
 *         return_item_code: { type: string, nullable: true }
 *         return_item_name: { type: string, nullable: true }
 *         return_item_size: { type: string, nullable: true }
 *         email: { type: string, nullable: true }
 *         phone_number: { type: string, nullable: true }
 *         reason: { type: string, nullable: true }
 *         other_detail: { type: string, nullable: true }
 *         required_item_code: { type: string, nullable: true }
 *         required_item_name: { type: string, nullable: true }
 *         required_item_size: { type: string, nullable: true }
 *         seen: { type: integer, example: 0 }
 *         created_at: { type: string, format: date-time }
 *         order:
 *           type: object
 *           nullable: true
 *           properties:
 *             id: { type: integer }
 *             order_number: { type: string }
 *             status: { type: integer }
 *             grand_total: { type: number }
 */

/**
 * @openapi
 * /api/admin/exchange:
 *   get:
 *     tags: [Admin Exchanges]
 *     summary: List exchange/return requests (paginated)
 *     description: Exchange requests are submitted by customers (public POST /api/exchanges) — this module lets staff review and act on them.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: seen
 *         schema: { type: integer, enum: [0, 1] }
 *     responses:
 *       200:
 *         description: Exchange requests fetched
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
 *                         exchanges:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Exchange" }
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
 * /api/admin/exchange/{id}:
 *   get:
 *     tags: [Admin Exchanges]
 *     summary: Get a single exchange request
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Exchange request found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Exchange" } }
 *       404:
 *         description: Exchange request not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Exchanges]
 *     summary: Delete an exchange request
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Exchange request deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Exchange request not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/exchange/{id}/seen:
 *   patch:
 *     tags: [Admin Exchanges]
 *     summary: Mark an exchange request as seen
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Marked as seen
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Exchange" } }
 *       404:
 *         description: Exchange request not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
