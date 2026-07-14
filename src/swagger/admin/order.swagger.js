/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         order_number: { type: string, example: "ORD-20260101-0001" }
 *         user_id: { type: integer, nullable: true, example: 1 }
 *         status: { type: integer, example: 0, description: "0=pending, 1=processing, 2=shipped, 3=delivered, 4=cancelled" }
 *         pay_method: { type: string, example: "cod" }
 *         sub_total: { type: number, example: 59.99 }
 *         coupon_discount: { type: number, nullable: true }
 *         grand_total: { type: number, example: 64.99 }
 *         payment_status: { type: string, enum: [pending, paid, failed, refunded], example: "pending" }
 *         seen: { type: integer, example: 0 }
 *         created_at: { type: string, format: date-time }
 *         user: { $ref: "#/components/schemas/UserBrief" }
 *         orderDetails:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               product_id: { type: integer }
 *               quantity: { type: integer }
 *               price: { type: number }
 *               total: { type: number }
 *               product: { $ref: "#/components/schemas/Product" }
 *         billingDetails:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               firstname: { type: string }
 *               lastname: { type: string }
 *               address_1: { type: string }
 *               city: { type: string }
 *               country: { type: string }
 *         statusHistory:
 *           type: array
 *           description: Audit trail of status/payment_status changes, newest first. Only present on GET /:id, not on the list endpoint.
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               field: { type: string, example: "status" }
 *               from_value: { type: string, nullable: true }
 *               to_value: { type: string }
 *               created_at: { type: string, format: date-time }
 *               changedByAdmin:
 *                 type: object
 *                 nullable: true
 *                 properties:
 *                   id: { type: integer }
 *                   name: { type: string }
 */

/**
 * @openapi
 * /api/admin/order:
 *   get:
 *     tags: [Admin Orders]
 *     summary: List orders (paginated, searchable, filterable)
 *     description: Orders are created by customers at checkout (user-side, not yet available) — this module manages existing orders only.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Matches against order_number
 *       - in: query
 *         name: status
 *         schema: { type: integer }
 *       - in: query
 *         name: payment_status
 *         schema: { type: string, enum: [pending, paid, failed, refunded] }
 *       - in: query
 *         name: user_id
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of orders
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
 *                         orders:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Order" }
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
 * /api/admin/order/{id}:
 *   get:
 *     tags: [Admin Orders]
 *     summary: Get a single order (with order details, billing, and customer info)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Order" } }
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Orders]
 *     summary: Delete an order (and its order details / billing / gallery via cascade)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Order deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/order/{id}/status:
 *   patch:
 *     tags: [Admin Orders]
 *     summary: Update order processing status
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
 *             required: [status]
 *             properties:
 *               status: { type: integer, example: 2, description: "0=pending, 1=processing, 2=shipped, 3=delivered, 4=cancelled" }
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Order" } }
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/order/{id}/payment-status:
 *   patch:
 *     tags: [Admin Orders]
 *     summary: Update order payment status
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
 *             required: [payment_status]
 *             properties:
 *               payment_status: { type: string, enum: [pending, paid, failed, refunded] }
 *     responses:
 *       200:
 *         description: Payment status updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Order" } }
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/order/{id}/seen:
 *   patch:
 *     tags: [Admin Orders]
 *     summary: Mark an order as seen (clears the "new order" indicator)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Order marked as seen
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Order" } }
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
