/**
 * @openapi
 * components:
 *   parameters:
 *     DeviceIdHeader:
 *       in: header
 *       name: X-Device-Id
 *       required: false
 *       schema: { type: string, example: "a1b2c3d4-guest-device" }
 *       description: >
 *         Guest cart identity. Required if no Authorization bearer token is
 *         sent. Generate once per device/browser (e.g. a UUID) and reuse it
 *         for every cart request. When the guest later registers/logs in,
 *         this device's cart is automatically merged into their account cart.
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         product_id: { type: integer, example: 2 }
 *         stock_id: { type: integer, nullable: true }
 *         size_id: { type: integer, nullable: true }
 *         fitting_id: { type: integer, nullable: true }
 *         quantity: { type: integer, example: 2 }
 *         composite_attribute_key: { type: integer, example: 0 }
 *         unitPrice: { type: number, example: 79.99 }
 *         lineTotal: { type: number, example: 159.98 }
 *         product: { $ref: "#/components/schemas/UserProduct" }
 *     Cart:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items: { $ref: "#/components/schemas/CartItem" }
 *         subTotal: { type: number, example: 159.98 }
 */

/**
 * @openapi
 * /api/cart:
 *   get:
 *     tags: [User Cart]
 *     summary: Get the cart (logged-in user or guest device) with computed line/sub totals
 *     description: >
 *       Works for both logged-in users (Bearer token) and guests
 *       (X-Device-Id header) — see the parameter description below.
 *     security: [{ bearerAuth: [] }, {}]
 *     parameters:
 *       - $ref: "#/components/parameters/DeviceIdHeader"
 *     responses:
 *       200:
 *         description: Cart fetched
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Cart" } }
 *       400:
 *         description: Neither a bearer token nor an X-Device-Id header was provided
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   post:
 *     tags: [User Cart]
 *     summary: Add an item to the cart (logged-in user or guest device)
 *     description: >
 *       For products with variations (is_variation=1), first call
 *       `GET /api/products/{slug}/stock` to resolve the correct `stock_id`,
 *       then pass it here. Adding the same product+variation again merges
 *       quantities instead of creating a duplicate line. Works for both
 *       logged-in users (Bearer token) and guests (X-Device-Id header).
 *     security: [{ bearerAuth: [] }, {}]
 *     parameters:
 *       - $ref: "#/components/parameters/DeviceIdHeader"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id]
 *             properties:
 *               product_id: { type: integer, example: 2 }
 *               stock_id: { type: integer, example: 5 }
 *               quantity: { type: integer, default: 1, example: 2 }
 *     responses:
 *       201:
 *         description: Item added
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/CartItem" } }
 *       400:
 *         description: Neither a bearer token nor an X-Device-Id header was provided
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       404:
 *         description: Product not found or unavailable
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Not enough stock available for the requested quantity
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       422:
 *         description: stock_id required/invalid for a variation product
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [User Cart]
 *     summary: Clear the entire cart
 *     security: [{ bearerAuth: [] }, {}]
 *     parameters:
 *       - $ref: "#/components/parameters/DeviceIdHeader"
 *     responses:
 *       200:
 *         description: Cart cleared
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 */

/**
 * @openapi
 * /api/cart/{id}:
 *   put:
 *     tags: [User Cart]
 *     summary: Update the quantity of a cart line
 *     security: [{ bearerAuth: [] }, {}]
 *     parameters:
 *       - $ref: "#/components/parameters/DeviceIdHeader"
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
 *             required: [quantity]
 *             properties: { quantity: { type: integer, minimum: 1, example: 3 } }
 *     responses:
 *       200:
 *         description: Cart item updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/CartItem" } }
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Not enough stock available
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [User Cart]
 *     summary: Remove a single cart line
 *     security: [{ bearerAuth: [] }, {}]
 *     parameters:
 *       - $ref: "#/components/parameters/DeviceIdHeader"
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Cart item removed
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
