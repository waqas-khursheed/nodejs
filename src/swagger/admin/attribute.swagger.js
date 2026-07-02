/**
 * @openapi
 * components:
 *   schemas:
 *     Attribute:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         attribute_title: { type: string, example: "Size" }
 *         attributeItems:
 *           type: array
 *           items: { $ref: "#/components/schemas/AttributeItem" }
 *     AttributeItem:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "Large" }
 *         attribute_id: { type: integer, example: 1 }
 *         order_by: { type: integer, nullable: true }
 *         image: { type: string, example: "" }
 */

/**
 * @openapi
 * /api/admin/attribute/create:
 *   post:
 *     tags: [Admin Attributes]
 *     summary: Create a new product attribute (e.g. Size, Color)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [attribute_title]
 *             properties:
 *               attribute_title: { type: string, example: "Size" }
 *     responses:
 *       201:
 *         description: Attribute created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Attribute" }
 *       409:
 *         description: An attribute with this title already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/attribute:
 *   get:
 *     tags: [Admin Attributes]
 *     summary: List product attributes
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
 *         description: List of attributes
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
 *                         attributes:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Attribute" }
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
 * /api/admin/attribute/{id}:
 *   get:
 *     tags: [Admin Attributes]
 *     summary: Get a single attribute (with its items)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Attribute found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Attribute" }
 *       404:
 *         description: Attribute not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Attributes]
 *     summary: Update an attribute
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
 *             required: [attribute_title]
 *             properties:
 *               attribute_title: { type: string }
 *     responses:
 *       200:
 *         description: Attribute updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/Attribute" }
 *       404:
 *         description: Attribute not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Attributes]
 *     summary: Delete an attribute (fails if it has attribute items)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Attribute deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Attribute not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       409:
 *         description: Attribute has items
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/attribute-item/create:
 *   post:
 *     tags: [Admin Attributes]
 *     summary: Create a new attribute item (e.g. "Large" under "Size")
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, attribute_id]
 *             properties:
 *               title: { type: string, example: "Large" }
 *               attribute_id: { type: integer, example: 1 }
 *               order_by: { type: integer }
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Image file. Accepted types: jpeg, png, webp, gif. Max size: 5MB"
 *     responses:
 *       201:
 *         description: Attribute item created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/AttributeItem" }
 *       409:
 *         description: This item already exists for the selected attribute
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *       422:
 *         description: Selected attribute does not exist
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/attribute-item:
 *   get:
 *     tags: [Admin Attributes]
 *     summary: List attribute items (optionally filtered by attribute_id)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: attribute_id
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of attribute items
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
 *                         items:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/AttributeItem" }
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
 * /api/admin/attribute-item/{id}:
 *   get:
 *     tags: [Admin Attributes]
 *     summary: Get a single attribute item
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Attribute item found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/AttributeItem" }
 *       404:
 *         description: Attribute item not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Attributes]
 *     summary: Update an attribute item
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
 *               attribute_id: { type: integer }
 *               order_by: { type: integer }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Attribute item updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data: { $ref: "#/components/schemas/AttributeItem" }
 *       404:
 *         description: Attribute item not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Attributes]
 *     summary: Delete an attribute item
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Attribute item deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: Attribute item not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
