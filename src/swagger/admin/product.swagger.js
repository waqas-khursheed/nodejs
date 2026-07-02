/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "Running Shoes" }
 *         slug: { type: string, example: "running-shoes" }
 *         short_desc: { type: string, nullable: true }
 *         long_desc: { type: string, nullable: true }
 *         features: { type: string, nullable: true }
 *         inside_box: { type: string, nullable: true }
 *         price: { type: number, example: 59.99 }
 *         d_price: { type: number, example: 0 }
 *         d_percentage: { type: number, example: 0 }
 *         dis_start_date: { type: string, format: date, nullable: true }
 *         dis_end_date: { type: string, format: date, nullable: true }
 *         quantity: { type: integer, example: 50 }
 *         sku: { type: string, nullable: true }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         sold: { type: integer, example: 0 }
 *         featured_image: { type: string, example: "1783029833165-872204938.png" }
 *         hovered_image: { type: string, nullable: true }
 *         brand_id: { type: integer, nullable: true, example: 1 }
 *         is_variation: { type: integer, example: 0 }
 *         is_prescription: { type: integer, example: 0 }
 *         weight: { type: number, nullable: true }
 *         new_arrival: { type: integer, example: 0 }
 *         best_seller: { type: integer, example: 0 }
 *         meta_keywords: { type: string, nullable: true }
 *         meta_description: { type: string, nullable: true }
 *         created_at: { type: string, format: date-time }
 *         updated_at: { type: string, format: date-time }
 *         brand: { $ref: "#/components/schemas/Brand" }
 *         productGalleries:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               image: { type: string }
 *               product_id: { type: integer }
 *         assignCatToProducts:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               product_id: { type: integer }
 *               category_id: { type: integer }
 *               category: { $ref: "#/components/schemas/Category" }
 */

/**
 * @openapi
 * /api/admin/product/create:
 *   post:
 *     tags: [Admin Products]
 *     summary: Create a new product
 *     description: >
 *       Creates a product with its featured/hovered image, optional gallery images,
 *       brand assignment, and category assignment in a single request.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, price, quantity, status, featured_image]
 *             properties:
 *               title: { type: string, example: "Running Shoes" }
 *               short_desc: { type: string }
 *               long_desc: { type: string }
 *               features: { type: string }
 *               inside_box: { type: string }
 *               price: { type: number, example: 59.99 }
 *               d_price: { type: number, example: 0 }
 *               d_percentage: { type: number, example: 0 }
 *               quantity: { type: integer, example: 50 }
 *               sku: { type: string }
 *               status: { type: integer, enum: [0, 1] }
 *               video_1: { type: string }
 *               video_2: { type: string }
 *               is_variation: { type: boolean, default: false }
 *               is_prescription: { type: boolean, default: false }
 *               weight: { type: number }
 *               brand_id: { type: integer, example: 1, description: "Must reference an existing brand" }
 *               category_ids:
 *                 type: string
 *                 description: JSON array or comma-separated category IDs, e.g. "[1,2]" or "1,2"
 *                 example: "[1,2]"
 *               featured_image:
 *                 type: string
 *                 format: binary
 *                 description: "Required. Accepted types: jpeg, png, webp, gif. Max size: 5MB"
 *               hovered_image: { type: string, format: binary }
 *               gallery:
 *                 type: array
 *                 items: { type: string, format: binary }
 *                 description: Up to 10 additional gallery images
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     message: { example: "Product created successfully" }
 *                     data: { $ref: "#/components/schemas/Product" }
 *       409:
 *         description: A product with this title already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       422:
 *         description: Featured image missing, brand not found, or category not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/product:
 *   get:
 *     tags: [Admin Products]
 *     summary: List products (paginated, searchable, filterable)
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
 *       - in: query
 *         name: brand_id
 *         schema: { type: integer }
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
 *                           items: { $ref: "#/components/schemas/Product" }
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
 * /api/admin/product/{id}:
 *   get:
 *     tags: [Admin Products]
 *     summary: Get a single product (with brand, categories, gallery)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
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
 *                     data: { $ref: "#/components/schemas/Product" }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Products]
 *     summary: Update a product
 *     description: >
 *       Partial update. Sending category_ids replaces the full set of assigned
 *       categories. Sending gallery adds more images (does not replace existing ones).
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
 *               price: { type: number }
 *               quantity: { type: integer }
 *               status: { type: integer, enum: [0, 1] }
 *               brand_id: { type: integer }
 *               category_ids: { type: string, example: "[1,2]" }
 *               featured_image: { type: string, format: binary }
 *               hovered_image: { type: string, format: binary }
 *               gallery:
 *                 type: array
 *                 items: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Product" }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: A product with this title already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Products]
 *     summary: Delete a product (and its gallery images / uploaded files)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Product deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/product/{id}/status:
 *   patch:
 *     tags: [Admin Products]
 *     summary: Toggle product active status (0/1)
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
 *                     data: { $ref: "#/components/schemas/Product" }
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/product/gallery/{galleryId}:
 *   delete:
 *     tags: [Admin Products]
 *     summary: Delete a single product gallery image
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: galleryId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Gallery image deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Gallery image not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
