/**
 * @openapi
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       description: Generated automatically when a new order/product/user/subscribe event happens — there is no admin create endpoint.
 *       properties:
 *         id: { type: integer, example: 1 }
 *         n_title: { type: string, example: "New order received" }
 *         n_desc: { type: string, example: "Order #ORD-1001 was placed" }
 *         table_name: { type: string, example: "orders" }
 *         row_id: { type: integer, example: 1 }
 *         seen: { type: integer, enum: [0, 1], example: 0 }
 *         created_at: { type: string, format: date-time }
 */

/**
 * @openapi
 * /api/admin/notification:
 *   get:
 *     tags: [Admin Notifications]
 *     summary: List notifications (filter by seen/table)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: integer, default: 1 } }
 *       - { in: query, name: limit, schema: { type: integer, default: 10 } }
 *       - { in: query, name: seen, schema: { type: integer, enum: [0, 1] } }
 *       - { in: query, name: table_name, schema: { type: string } }
 *     responses:
 *       200:
 *         description: List of notifications
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
 *                         notifications:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Notification" }
 *                         meta: { type: object }
 */

/**
 * @openapi
 * /api/admin/notification/{id}:
 *   get:
 *     tags: [Admin Notifications]
 *     summary: Get a single notification
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Notification" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Notifications]
 *     summary: Delete a notification
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/notification/{id}/seen:
 *   patch:
 *     tags: [Admin Notifications]
 *     summary: Mark a single notification as seen
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Marked as seen, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Notification" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/notification/seen-all:
 *   patch:
 *     tags: [Admin Notifications]
 *     summary: Mark all unseen notifications as seen
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: All notifications marked as seen
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 */
