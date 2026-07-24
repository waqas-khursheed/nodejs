/**
 * @openapi
 * components:
 *   schemas:
 *     UserOrder:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 3 }
 *         order_number: { type: string, example: "ORD-1783617310252218" }
 *         status: { type: integer, example: 0 }
 *         pay_method: { type: string, example: "cod" }
 *         shipping: { type: integer, example: 0 }
 *         sub_total: { type: number, example: 79.99 }
 *         coupon_discount: { type: number, nullable: true, example: 8 }
 *         coupon_title: { type: string, nullable: true, example: "SAVE10" }
 *         grand_total: { type: number, example: 71.99 }
 *         payment_status: { type: string, example: "pending" }
 *         created_at: { type: string, format: date-time }
 *         orderDetails:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               product_id: { type: integer }
 *               size_id: { type: integer }
 *               color_id: { type: integer, nullable: true }
 *               fitting_id: { type: integer, nullable: true }
 *               quantity: { type: integer }
 *               price: { type: number }
 *               total: { type: number }
 *               product: { $ref: "#/components/schemas/UserProduct" }
 *         billingDetails:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               firstname: { type: string }
 *               lastname: { type: string, nullable: true }
 *               address_1: { type: string }
 *               city: { type: string }
 *               country: { type: string }
 *               state: { type: string }
 */

/**
 * @openapi
 * /api/checkout:
 *   post:
 *     tags: [User Checkout & Orders]
 *     summary: Place an order from the current cart
 *     description: >
 *       Re-validates stock, applies a coupon discount if provided, computes
 *       shipping from web settings, creates the Order/OrderDetail/BillingDetail
 *       rows, decrements stock, records coupon usage, and clears the cart.
 *       Card payment is disabled for now — cash on delivery only.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pay_method, billing]
 *             properties:
 *               pay_method: { type: string, enum: [cod], example: "cod" }
 *               coupon_code: { type: string, example: "SAVE10" }
 *               delivery_day: { type: string, example: "Monday" }
 *               delivery_start_time: { type: string, example: "09:00:00" }
 *               delivery_end_time: { type: string, example: "18:00:00" }
 *               type: { type: string, example: "web" }
 *               billing:
 *                 type: object
 *                 required: [firstname, address_1, city, country, state]
 *                 properties:
 *                   firstname: { type: string, example: "Test" }
 *                   lastname: { type: string, example: "Buyer" }
 *                   email: { type: string, example: "buyer1@example.com" }
 *                   phone: { type: string, example: "03001234567" }
 *                   company: { type: string }
 *                   address_1: { type: string, example: "123 Main St" }
 *                   address_2: { type: string }
 *                   city: { type: string, example: "Lahore" }
 *                   postcode: { type: string, example: "54000" }
 *                   country: { type: string, example: "Pakistan" }
 *                   state: { type: string, example: "Punjab" }
 *     responses:
 *       201:
 *         description: Order placed
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/UserOrder" } }
 *       422:
 *         description: Cart is empty, or the coupon does not apply to the cart
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       404:
 *         description: Invalid coupon code, or a cart product no longer exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Coupon already used, or insufficient stock on one or more items
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/orders:
 *   get:
 *     tags: [User Checkout & Orders]
 *     summary: List the logged-in user's order history
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Orders fetched
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
 *                           items: { $ref: "#/components/schemas/UserOrder" }
 *                         meta: { type: object }
 */

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     tags: [User Checkout & Orders]
 *     summary: Get a single order (must belong to the logged-in user)
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
 *                   properties: { data: { $ref: "#/components/schemas/UserOrder" } }
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
