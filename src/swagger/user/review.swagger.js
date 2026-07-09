/**
 * @openapi
 * /api/reviews:
 *   post:
 *     tags: [User Reviews]
 *     summary: Submit a review for a product
 *     description: One review per user per product. New reviews start as pending (status 0) and only appear publicly once an admin approves them.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id, review, rate]
 *             properties:
 *               product_id: { type: integer, example: 2 }
 *               review: { type: string, example: "Great quality, fits perfectly." }
 *               rate: { type: integer, minimum: 1, maximum: 5, example: 5 }
 *     responses:
 *       201:
 *         description: Review submitted
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Review" } }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: You have already reviewed this product
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/reviews/product/{productId}:
 *   get:
 *     tags: [User Reviews]
 *     summary: List approved reviews for a product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of approved reviews
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
 *                         reviews:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Review" }
 *                         meta: { type: object }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
