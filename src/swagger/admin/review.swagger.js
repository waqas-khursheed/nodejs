/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       description: "status: 0 = pending, 1 = approved, 2 = rejected"
 *       properties:
 *         id: { type: integer, example: 1 }
 *         product_id: { type: integer, example: 1 }
 *         user_id: { type: integer, example: 1 }
 *         name: { type: string, example: "Test User" }
 *         review: { type: string, example: "Great quality, fits perfectly." }
 *         rate: { type: integer, example: 5 }
 *         status: { type: integer, enum: [0, 1, 2], example: 0 }
 *         created_at: { type: string, format: date-time }
 *         product:
 *           type: object
 *           properties:
 *             id: { type: integer }
 *             title: { type: string }
 *             slug: { type: string }
 *         user:
 *           type: object
 *           properties:
 *             id: { type: integer }
 *             first_name: { type: string }
 *             email: { type: string }
 */

/**
 * @openapi
 * /api/admin/review:
 *   get:
 *     tags: [Admin Reviews]
 *     summary: List reviews (filter by status/product)
 *     description: Reviews are submitted by customers on the user-side — there is no admin create endpoint.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: integer, enum: [0, 1, 2] }
 *       - in: query
 *         name: product_id
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of reviews
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
 * /api/admin/review/{id}:
 *   get:
 *     tags: [Admin Reviews]
 *     summary: Get a single review
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Review" } }
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Reviews]
 *     summary: Delete a review
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Review deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/review/{id}/status:
 *   patch:
 *     tags: [Admin Reviews]
 *     summary: Approve or reject a review
 *     security: [{ bearerAuth: [] }]
 *     parameters:
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
 *             required: [status]
 *             properties:
 *               status: { type: integer, enum: [0, 1, 2], example: 1 }
 *     responses:
 *       200:
 *         description: Status updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Review" } }
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
