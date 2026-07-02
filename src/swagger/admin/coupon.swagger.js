/**
 * @openapi
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         code: { type: string, example: "SAVE20" }
 *         percentage: { type: number, example: 20 }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         to_all: { type: integer, enum: [0, 1], example: 1, description: "1 = applies to all categories, 0 = restricted to metaCouponCategories" }
 *         created_at: { type: string, format: date-time }
 *         metaCouponCategories:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               cat_id: { type: integer }
 *               coupon_id: { type: integer }
 *               cat: { $ref: "#/components/schemas/Category" }
 */

/**
 * @openapi
 * /api/admin/coupon/create:
 *   post:
 *     tags: [Admin Coupons]
 *     summary: Create a coupon
 *     description: >
 *       If to_all=0, pass category_ids to restrict the coupon to specific
 *       categories (creates meta_coupon_categories rows).
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, percentage, status]
 *             properties:
 *               code: { type: string, example: "SAVE20" }
 *               percentage: { type: number, example: 20 }
 *               status: { type: integer, enum: [0, 1] }
 *               to_all: { type: integer, enum: [0, 1], default: 1 }
 *               category_ids:
 *                 type: array
 *                 items: { type: integer }
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Coupon created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Coupon" } }
 *       409:
 *         description: A coupon with this code already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       422:
 *         description: Validation error / category not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/coupon:
 *   get:
 *     tags: [Admin Coupons]
 *     summary: List coupons (paginated, searchable, filterable)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Matches against coupon code
 *       - in: query
 *         name: status
 *         schema: { type: integer, enum: [0, 1] }
 *     responses:
 *       200:
 *         description: List of coupons
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
 *                         coupons:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Coupon" }
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
 * /api/admin/coupon/{id}:
 *   get:
 *     tags: [Admin Coupons]
 *     summary: Get a single coupon (with restricted categories)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Coupon found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Coupon" } }
 *       404:
 *         description: Coupon not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Coupons]
 *     summary: Update a coupon
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
 *             properties:
 *               code: { type: string }
 *               percentage: { type: number }
 *               status: { type: integer, enum: [0, 1] }
 *               to_all: { type: integer, enum: [0, 1] }
 *               category_ids:
 *                 type: array
 *                 items: { type: integer }
 *     responses:
 *       200:
 *         description: Coupon updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Coupon" } }
 *       404:
 *         description: Coupon not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: A coupon with this code already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Coupons]
 *     summary: Delete a coupon
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Coupon deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Coupon not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/coupon/{id}/status:
 *   patch:
 *     tags: [Admin Coupons]
 *     summary: Toggle coupon active status (0/1)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Status toggled
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Coupon" } }
 *       404:
 *         description: Coupon not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
