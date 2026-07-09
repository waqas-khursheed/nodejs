/**
 * @openapi
 * /api/brands:
 *   get:
 *     tags: [User Brands]
 *     summary: List active brands
 *     responses:
 *       200:
 *         description: List of brands
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
 *                         brands:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Brand" }
 */

/**
 * @openapi
 * /api/brands/{slug}:
 *   get:
 *     tags: [User Brands]
 *     summary: Get an active brand by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Brand found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Brand" } }
 *       404:
 *         description: Brand not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
