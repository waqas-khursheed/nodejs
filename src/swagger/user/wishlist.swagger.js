/**
 * @openapi
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         product_id: { type: integer, example: 2 }
 *         user_id: { type: integer, example: 3 }
 *         created_at: { type: string, format: date-time }
 *         product: { $ref: "#/components/schemas/UserProduct" }
 */

/**
 * @openapi
 * /api/wishlist:
 *   get:
 *     tags: [User Wishlist]
 *     summary: List the logged-in user's wishlist
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Wishlist fetched
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
 *                         wishlist:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/WishlistItem" }
 *   post:
 *     tags: [User Wishlist]
 *     summary: Add a product to the wishlist
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product_id]
 *             properties: { product_id: { type: integer, example: 2 } }
 *     responses:
 *       201:
 *         description: Added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/WishlistItem" } }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Product is already in your wishlist
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/wishlist/{productId}:
 *   delete:
 *     tags: [User Wishlist]
 *     summary: Remove a product from the wishlist
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Removed from wishlist
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Product is not in your wishlist
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
