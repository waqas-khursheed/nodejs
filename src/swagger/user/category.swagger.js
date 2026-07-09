/**
 * @openapi
 * components:
 *   schemas:
 *     UserCategory:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "men" }
 *         slug: { type: string, example: "men" }
 *         image: { type: string, nullable: true }
 *         icon: { type: string, nullable: true }
 *         parent_id: { type: integer, example: 0 }
 *         children:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               title: { type: string }
 *               slug: { type: string }
 */

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags: [User Categories]
 *     summary: List active categories as a two-level tree (top-level + children)
 *     responses:
 *       200:
 *         description: Category tree
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
 *                         categories:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/UserCategory" }
 */

/**
 * @openapi
 * /api/categories/{slug}:
 *   get:
 *     tags: [User Categories]
 *     summary: Get an active category by slug (with its children)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/UserCategory" } }
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
