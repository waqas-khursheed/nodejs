/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "electronics" }
 *         description: { type: string, nullable: true, example: null }
 *         slug: { type: string, example: "electronics" }
 *         meta_title: { type: string, nullable: true }
 *         image: { type: string, example: "1783029709260-600947143.png" }
 *         icon: { type: string, example: "" }
 *         meta_keywords: { type: string, nullable: true }
 *         meta_desc: { type: string, nullable: true }
 *         size_chart_mobile: { type: string, nullable: true }
 *         size_chart: { type: string, nullable: true }
 *         is_size_chart: { type: integer, example: 0 }
 *         parent_id: { type: integer, example: 0 }
 *         order_by: { type: integer, example: 0 }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         created_at: { type: string, format: date-time }
 *         updated_at: { type: string, format: date-time }
 */

/**
 * @openapi
 * /api/admin/category/create:
 *   post:
 *     tags: [Admin Categories]
 *     summary: Create a new category
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, status]
 *             properties:
 *               title: { type: string, example: "Men's Wear" }
 *               description: { type: string }
 *               meta_title: { type: string }
 *               meta_keywords: { type: string }
 *               meta_desc: { type: string }
 *               parent_id: { type: integer, example: 0, description: "0 = top-level category" }
 *               status: { type: integer, enum: [0, 1] }
 *               order_by: { type: integer }
 *               is_size_chart: { type: boolean }
 *               image: { type: string, format: binary }
 *               icon: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     message: { example: "Category created successfully" }
 *                     data: { $ref: "#/components/schemas/Category" }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/UnauthorizedResponse" }
 *       409:
 *         description: A category with this title already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       422:
 *         description: Validation error / parent category not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/category:
 *   get:
 *     tags: [Admin Categories]
 *     summary: List categories (paginated, searchable, filterable)
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
 *         description: Matches against category title
 *       - in: query
 *         name: status
 *         schema: { type: integer, enum: [0, 1] }
 *       - in: query
 *         name: parent_id
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of categories
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
 *                           items: { $ref: "#/components/schemas/Category" }
 *                         meta:
 *                           type: object
 *                           properties:
 *                             total: { type: integer, example: 1 }
 *                             page: { type: integer, example: 1 }
 *                             limit: { type: integer, example: 10 }
 *                             totalPages: { type: integer, example: 1 }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/UnauthorizedResponse" }
 */

/**
 * @openapi
 * /api/admin/category/{id}:
 *   get:
 *     tags: [Admin Categories]
 *     summary: Get a single category by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Category" }
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Categories]
 *     summary: Update a category
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
 *               meta_title: { type: string }
 *               meta_keywords: { type: string }
 *               meta_desc: { type: string }
 *               parent_id: { type: integer }
 *               status: { type: integer, enum: [0, 1] }
 *               order_by: { type: integer }
 *               is_size_chart: { type: boolean }
 *               image: { type: string, format: binary }
 *               icon: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Category updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Category" }
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: A category with this title already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       422:
 *         description: Validation error / cannot be own parent / parent not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 *   delete:
 *     tags: [Admin Categories]
 *     summary: Delete a category (fails if it has subcategories)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Category deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Category has subcategories
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/category/{id}/status:
 *   patch:
 *     tags: [Admin Categories]
 *     summary: Toggle category active status (0/1)
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
 *                     data: { $ref: "#/components/schemas/Category" }
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
