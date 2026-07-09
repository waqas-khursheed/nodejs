/**
 * @openapi
 * /api/exchanges:
 *   post:
 *     tags: [User Exchanges]
 *     summary: Submit an order return/exchange request
 *     description: Public endpoint — matches the reference site's guest-accessible exchange form (identified by order number/email, not a login).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [customer_name]
 *             properties:
 *               order_number: { type: string, example: "ORD-1783617310252218" }
 *               customer_name: { type: string, example: "Test Buyer" }
 *               email: { type: string, example: "buyer1@example.com" }
 *               phone_number: { type: string, example: "03001234567" }
 *               return_item_code: { type: string, example: "SKU-123" }
 *               return_item_name: { type: string, example: "Test Sneakers" }
 *               return_item_size: { type: string, example: "M" }
 *               required_item_code: { type: string, example: "SKU-124" }
 *               required_item_name: { type: string, example: "Test Sneakers" }
 *               required_item_size: { type: string, example: "L" }
 *               reason: { type: string, example: "Wrong size" }
 *               other_detail: { type: string }
 *               date: { type: string, example: "2026-07-09" }
 *     responses:
 *       201:
 *         description: Exchange request submitted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessDataResponse" }
 */
