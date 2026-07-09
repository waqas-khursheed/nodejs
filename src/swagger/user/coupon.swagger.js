/**
 * @openapi
 * /api/coupon/apply:
 *   post:
 *     tags: [User Coupons]
 *     summary: Preview a coupon's discount against the current cart
 *     description: >
 *       This only previews the discount — it does not mark the coupon as used.
 *       The coupon is actually consumed (and blocked from reuse) when the order
 *       is placed via `POST /api/checkout` with the same `coupon_code`.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code]
 *             properties: { code: { type: string, example: "SAVE10" } }
 *     responses:
 *       200:
 *         description: Coupon is valid — discount computed
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
 *                         code: { type: string, example: "SAVE10" }
 *                         percentage: { type: number, example: 10 }
 *                         cartSubtotal: { type: number, example: 159.98 }
 *                         eligibleSubtotal: { type: number, example: 159.98 }
 *                         discountAmount: { type: number, example: 16 }
 *                         newTotal: { type: number, example: 143.98 }
 *       404:
 *         description: Invalid or inactive coupon code
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: You have already used this coupon
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       422:
 *         description: Cart is empty, or the coupon does not apply to any cart items (category-restricted coupons)
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
