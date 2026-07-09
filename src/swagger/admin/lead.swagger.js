/**
 * @openapi
 * components:
 *   schemas:
 *     QueryForm:
 *       type: object
 *       description: A contact-form submission — there is no admin create endpoint.
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "Ali Raza" }
 *         email: { type: string, example: "ali@example.com" }
 *         phone: { type: string, nullable: true, example: "+92 300 1234567" }
 *         description: { type: string, example: "I have a question about my order." }
 *         seen: { type: integer, enum: [0, 1], example: 0 }
 *         created_at: { type: string, format: date-time }
 *     Subscriber:
 *       type: object
 *       description: A newsletter subscriber — there is no admin create endpoint.
 *       properties:
 *         id: { type: integer, example: 1 }
 *         email: { type: string, example: "subscriber@example.com" }
 *         seen: { type: integer, enum: [0, 1], example: 0 }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         created_at: { type: string, format: date-time }
 */

/**
 * @openapi
 * /api/admin/query-form:
 *   get:
 *     tags: [Admin Leads]
 *     summary: List contact-form submissions
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: integer, default: 1 } }
 *       - { in: query, name: limit, schema: { type: integer, default: 10 } }
 *       - { in: query, name: seen, schema: { type: integer, enum: [0, 1] } }
 *     responses:
 *       200:
 *         description: List of query forms
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
 *                         queryForms:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/QueryForm" }
 *                         meta: { type: object }
 */

/**
 * @openapi
 * /api/admin/query-form/{id}:
 *   get:
 *     tags: [Admin Leads]
 *     summary: Get a contact-form submission
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/QueryForm" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Leads]
 *     summary: Delete a contact-form submission
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/query-form/{id}/seen:
 *   patch:
 *     tags: [Admin Leads]
 *     summary: Mark a contact-form submission as seen
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Marked as seen, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/QueryForm" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/subscriber:
 *   get:
 *     tags: [Admin Leads]
 *     summary: List newsletter subscribers
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - { in: query, name: page, schema: { type: integer, default: 1 } }
 *       - { in: query, name: limit, schema: { type: integer, default: 10 } }
 *       - { in: query, name: status, schema: { type: integer, enum: [0, 1] } }
 *     responses:
 *       200:
 *         description: List of subscribers
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
 *                         subscribers:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Subscriber" }
 *                         meta: { type: object }
 */

/**
 * @openapi
 * /api/admin/subscriber/{id}/status:
 *   patch:
 *     tags: [Admin Leads]
 *     summary: Toggle a subscriber's active status (also marks it as seen)
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Status toggled, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Subscriber" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 * /api/admin/subscriber/{id}:
 *   delete:
 *     tags: [Admin Leads]
 *     summary: Delete a subscriber
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */
