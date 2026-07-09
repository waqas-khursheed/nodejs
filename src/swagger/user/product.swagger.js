/**
 * @openapi
 * components:
 *   schemas:
 *     UserProduct:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 2 }
 *         title: { type: string, example: "Test Sneakers" }
 *         slug: { type: string, example: "test-sneakers" }
 *         price: { type: number, example: 79.99 }
 *         d_price: { type: integer, example: 0 }
 *         d_percentage: { type: integer, example: 0 }
 *         quantity: { type: integer, example: 8 }
 *         status: { type: integer, example: 1 }
 *         featured_image: { type: string }
 *         hovered_image: { type: string, nullable: true }
 *         is_variation: { type: integer, enum: [0, 1] }
 *         new_arrival: { type: integer, enum: [0, 1] }
 *         best_seller: { type: integer, enum: [0, 1] }
 *         brand: { $ref: "#/components/schemas/Brand" }
 */

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags: [User Products]
 *     summary: List/search/filter active products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Matches against product title
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         description: Category slug
 *       - in: query
 *         name: brand
 *         schema: { type: string }
 *         description: Brand slug
 *       - in: query
 *         name: tag
 *         schema: { type: string }
 *         description: Tag slug
 *       - in: query
 *         name: min_price
 *         schema: { type: number }
 *       - in: query
 *         name: max_price
 *         schema: { type: number }
 *       - in: query
 *         name: new_arrival
 *         schema: { type: integer, enum: [0, 1] }
 *       - in: query
 *         name: best_seller
 *         schema: { type: integer, enum: [0, 1] }
 *       - in: query
 *         name: sale
 *         schema: { type: integer, enum: [0, 1] }
 *         description: When 1, only returns products with a product-level percentage discount
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [newest, price_asc, price_desc, best_selling] }
 *     responses:
 *       200:
 *         description: List of products
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
 *                         products:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/UserProduct" }
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
 * /api/products/{slug}:
 *   get:
 *     tags: [User Products]
 *     summary: Get full product detail by slug
 *     description: Includes gallery, brand, assigned categories/attributes/tags, stock variations and review stats (approved reviews only).
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       allOf:
 *                         - $ref: "#/components/schemas/UserProduct"
 *                         - type: object
 *                           properties:
 *                             reviewStats:
 *                               type: object
 *                               properties:
 *                                 count: { type: integer, example: 4 }
 *                                 average: { type: number, example: 4.5 }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/products/{slug}/related:
 *   get:
 *     tags: [User Products]
 *     summary: Get products related to this one (same categories)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 8 }
 *     responses:
 *       200:
 *         description: Related products
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
 *                         products:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/UserProduct" }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/products/{slug}/stock:
 *   get:
 *     tags: [User Products]
 *     summary: Check stock/price for a specific variation (size/color/fitting)
 *     description: Use this before adding a variation product to the cart to get its stock_id.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: size_id
 *         schema: { type: integer }
 *       - in: query
 *         name: color_id
 *         schema: { type: integer }
 *       - in: query
 *         name: fitting_id
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Matching stock entry
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Stock" } }
 *       404:
 *         description: Product not found, or no stock exists for that variation
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
