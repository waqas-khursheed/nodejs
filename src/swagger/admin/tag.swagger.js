/**
 * @openapi
 * components:
 *   schemas:
 *     ProductTag:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Summer Sale" }
 *         slug: { type: string, example: "summer-sale" }
 *         meta_title: { type: string, nullable: true }
 *         meta_keywords: { type: string, nullable: true }
 *         og_image: { type: string, nullable: true, description: "Bare filename, served at /uploads/tags/<filename>" }
 *         icon: { type: string, nullable: true, description: "Bare filename, served at /uploads/tags/<filename>" }
 *         description: { type: string, nullable: true }
 *         meta_description: { type: string, nullable: true }
 *         body_description: { type: string, nullable: true }
 */

/**
 * @openapi
 * /api/admin/tag:
 *   post:
 *     tags: [Admin Tags]
 *     summary: Create a product tag (multipart — icon/og_image optional)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               meta_title: { type: string }
 *               meta_keywords: { type: string }
 *               meta_description: { type: string }
 *               body_description: { type: string }
 *               icon: { type: string, format: binary }
 *               og_image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Tag created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/ProductTag" } }
 *   get:
 *     tags: [Admin Tags]
 *     summary: List product tags (paginated, searchable)
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
 *     responses:
 *       200:
 *         description: Tags fetched
 */

/**
 * @openapi
 * /api/admin/tag/{id}:
 *   get:
 *     tags: [Admin Tags]
 *     summary: Get a single tag
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tag found
 *       404:
 *         description: Tag not found
 *   put:
 *     tags: [Admin Tags]
 *     summary: Update a tag (multipart — icon/og_image optional, only replaced if provided)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tag updated
 *       404:
 *         description: Tag not found
 *   delete:
 *     tags: [Admin Tags]
 *     summary: Delete a tag
 *     description: Blocked (409) if any product is still assigned this tag.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tag deleted
 *       404:
 *         description: Tag not found
 *       409:
 *         description: Tag still assigned to products
 */

/**
 * @openapi
 * /api/admin/tag/{id}/meta-tags:
 *   get:
 *     tags: [Admin Tags]
 *     summary: List a tag's related search terms (assign_tag_to_tags)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Related terms fetched
 *   put:
 *     tags: [Admin Tags]
 *     summary: Replace a tag's related search terms
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
 *               meta_tags:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       200:
 *         description: Related terms replaced
 */

/**
 * @openapi
 * /api/admin/product-tag/{productId}:
 *   get:
 *     tags: [Admin Tags]
 *     summary: Get the tags currently assigned to a product
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Assigned tags fetched
 *       404:
 *         description: Product not found
 *   put:
 *     tags: [Admin Tags]
 *     summary: Replace a product's tag assignments (full sync)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag_ids:
 *                 type: array
 *                 items: { type: integer }
 *     responses:
 *       200:
 *         description: Tag assignments replaced
 *       404:
 *         description: Product not found
 *       422:
 *         description: One or more tag_ids don't exist
 */
