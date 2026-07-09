/**
 * @openapi
 * /api/card-detail/check:
 *   get:
 *     tags: [User Payment]
 *     summary: Check whether a card number qualifies for an admin-configured discount
 *     description: Used at checkout to preview a card-based discount before placing the order via `card_no`.
 *     parameters:
 *       - in: query
 *         name: card_no
 *         required: true
 *         schema: { type: integer, example: 411111 }
 *     responses:
 *       200:
 *         description: Lookup result (always 200 — check the `eligible` flag)
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
 *                         eligible: { type: boolean, example: true }
 *                         percentage: { type: number, example: 10 }
 *                         bank: { $ref: "#/components/schemas/Bank" }
 *                         cardCategory: { $ref: "#/components/schemas/CardCategory" }
 *                         cardType: { $ref: "#/components/schemas/CardType" }
 */
