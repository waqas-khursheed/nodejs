/**
 * @openapi
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "Nike" }
 *         slug: { type: string, example: "nike" }
 *         description: { type: string, nullable: true }
 *         logo: { type: string, example: "1783029709260-600947143.png" }
 *         banner: { type: string, example: "1783029709261-226384993.png" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         created_at: { type: string, format: date-time }
 *         updated_at: { type: string, format: date-time }
 */

/**
 * @openapi
 * /api/admin/brand/create:
 *   post:
 *     tags: [Admin Brands]
 *     summary: Create a new brand
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, status, logo, banner]
 *             properties:
 *               title: { type: string, example: "Nike" }
 *               description: { type: string }
 *               status: { type: integer, enum: [0, 1] }
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: "Image file. Accepted types: jpeg, png, webp, gif. Max size: 5MB"
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: "Image file. Accepted types: jpeg, png, webp, gif. Max size: 5MB"
 *     responses:
 *       201:
 *         description: Brand created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     message: { example: "Brand created successfully" }
 *                     data: { $ref: "#/components/schemas/Brand" }
 *       409:
 *         description: A brand with this title already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       422:
 *         description: Validation error (missing title/status/logo/banner, or invalid file type)
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/brand:
 *   get:
 *     tags: [Admin Brands]
 *     summary: List brands (paginated, searchable, filterable)
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
 *       - in: query
 *         name: status
 *         schema: { type: integer, enum: [0, 1] }
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
 * /api/admin/brand/{id}:
 *   get:
 *     tags: [Admin Brands]
 *     summary: Get a single brand by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Brand found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Brand" }
 *       404:
 *         description: Brand not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Brands]
 *     summary: Update a brand
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: integer, enum: [0, 1] }
 *               logo: { type: string, format: binary }
 *               banner: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Brand updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Brand" }
 *       404:
 *         description: Brand not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: A brand with this title already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Brands]
 *     summary: Delete a brand
 *     description: Any products referencing this brand will have their brand_id set to NULL.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Brand deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Brand not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/brand/{id}/status:
 *   patch:
 *     tags: [Admin Brands]
 *     summary: Toggle brand active status (0/1)
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
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Brand" }
 *       404:
 *         description: Brand not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
