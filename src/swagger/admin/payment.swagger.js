/**
 * @openapi
 * components:
 *   schemas:
 *     Bank:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         bank_title: { type: string, example: "HBL" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         created_at: { type: string, format: date-time }
 *     CardCategory:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         card_category: { type: string, example: "Debit Card" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *     CardType:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         card_type: { type: string, example: "Visa" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *     CardDetail:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         card_no: { type: integer, example: 411111 }
 *         country_id: { type: integer, example: 1 }
 *         card_category_id: { type: integer, example: 1 }
 *         card_type_id: { type: integer, example: 1 }
 *         bank_id: { type: integer, example: 1 }
 *         percentage: { type: number, example: 10 }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         country: { $ref: "#/components/schemas/Country" }
 *         cardCategory: { $ref: "#/components/schemas/CardCategory" }
 *         cardType: { $ref: "#/components/schemas/CardType" }
 *         bank: { $ref: "#/components/schemas/Bank" }
 *     MobileCard:
 *       type: object
 *       description: Read-only device-level usage record generated when a card discount is applied
 *       properties:
 *         id: { type: integer, example: 1 }
 *         card_id: { type: integer, example: 1 }
 *         card_no: { type: integer, nullable: true }
 *         percentage: { type: integer, nullable: true }
 *         device_id: { type: string, example: "device-abc-123" }
 *         created_at: { type: string, format: date-time }
 */

/**
 * @openapi
 * /api/admin/bank/create:
 *   post:
 *     tags: [Admin Card & Bank]
 *     summary: Create a bank
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, required: [bank_title], properties: { bank_title: { type: string, example: "HBL" }, status: { type: integer, enum: [0, 1], default: 0 } } } } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Bank" } } }] } } } }
 * /api/admin/bank:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: List banks
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: search, schema: { type: string } }, { in: query, name: status, schema: { type: integer, enum: [0, 1] } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { banks: { type: array, items: { $ref: "#/components/schemas/Bank" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/bank/{id}:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: Get a bank
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Bank" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Card & Bank]
 *     summary: Update a bank
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { bank_title: { type: string }, status: { type: integer, enum: [0, 1] } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/Bank" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Card & Bank]
 *     summary: Delete a bank
 *     description: Blocked with 409 if card details still reference it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Still referenced, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/card-category/create:
 *   post:
 *     tags: [Admin Card & Bank]
 *     summary: Create a card category
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, required: [card_category], properties: { card_category: { type: string, example: "Debit Card" }, status: { type: integer, enum: [0, 1], default: 0 } } } } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardCategory" } } }] } } } }
 * /api/admin/card-category:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: List card categories
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: search, schema: { type: string } }, { in: query, name: status, schema: { type: integer, enum: [0, 1] } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { cardCategories: { type: array, items: { $ref: "#/components/schemas/CardCategory" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/card-category/{id}:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: Get a card category
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardCategory" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Card & Bank]
 *     summary: Update a card category
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { card_category: { type: string }, status: { type: integer, enum: [0, 1] } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardCategory" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Card & Bank]
 *     summary: Delete a card category
 *     description: Blocked with 409 if card details still reference it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Still referenced, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/card-type/create:
 *   post:
 *     tags: [Admin Card & Bank]
 *     summary: Create a card type
 *     security: [{ bearerAuth: [] }]
 *     requestBody: { required: true, content: { application/json: { schema: { type: object, required: [card_type], properties: { card_type: { type: string, example: "Visa" }, status: { type: integer, enum: [0, 1], default: 0 } } } } } }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardType" } } }] } } } }
 * /api/admin/card-type:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: List card types
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: search, schema: { type: string } }, { in: query, name: status, schema: { type: integer, enum: [0, 1] } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { cardTypes: { type: array, items: { $ref: "#/components/schemas/CardType" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/card-type/{id}:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: Get a card type
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardType" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Card & Bank]
 *     summary: Update a card type
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { card_type: { type: string }, status: { type: integer, enum: [0, 1] } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardType" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Card & Bank]
 *     summary: Delete a card type
 *     description: Blocked with 409 if card details still reference it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Still referenced, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/card-detail/create:
 *   post:
 *     tags: [Admin Card & Bank]
 *     summary: Create a card discount rule
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [card_no, country_id, card_category_id, card_type_id, bank_id, percentage]
 *             properties:
 *               card_no: { type: integer, example: 411111 }
 *               country_id: { type: integer, example: 1 }
 *               card_category_id: { type: integer, example: 1 }
 *               card_type_id: { type: integer, example: 1 }
 *               bank_id: { type: integer, example: 1 }
 *               percentage: { type: number, example: 10 }
 *               status: { type: integer, enum: [0, 1], default: 0 }
 *     responses:
 *       201: { description: Created, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardDetail" } } }] } } } }
 *       422: { description: Country/category/type/bank does not exist, content: { application/json: { schema: { $ref: "#/components/schemas/ValidationErrorResponse" } } } }
 * /api/admin/card-detail:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: List card discount rules
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: status, schema: { type: integer, enum: [0, 1] } }, { in: query, name: bank_id, schema: { type: integer } }, { in: query, name: card_category_id, schema: { type: integer } }, { in: query, name: card_type_id, schema: { type: integer } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { cardDetails: { type: array, items: { $ref: "#/components/schemas/CardDetail" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/card-detail/{id}:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: Get a card discount rule
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardDetail" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Card & Bank]
 *     summary: Update a card discount rule
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody: { content: { application/json: { schema: { type: object, properties: { card_no: { type: integer }, country_id: { type: integer }, card_category_id: { type: integer }, card_type_id: { type: integer }, bank_id: { type: integer }, percentage: { type: number }, status: { type: integer, enum: [0, 1] } } } } } }
 *     responses:
 *       200: { description: Updated, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/CardDetail" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Card & Bank]
 *     summary: Delete a card discount rule
 *     description: Blocked with 409 if mobile card usage records still reference it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Still referenced, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/mobile-card:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: List mobile card usage records (read-only)
 *     description: Generated automatically when a customer applies a card discount on the user-side — there is no admin create/update here.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: query, name: page, schema: { type: integer, default: 1 } }, { in: query, name: limit, schema: { type: integer, default: 10 } }, { in: query, name: card_id, schema: { type: integer } }]
 *     responses:
 *       200: { description: List, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { type: object, properties: { mobileCards: { type: array, items: { $ref: "#/components/schemas/MobileCard" } }, meta: { type: object } } } } }] } } } }
 * /api/admin/mobile-card/{id}:
 *   get:
 *     tags: [Admin Card & Bank]
 *     summary: Get a mobile card usage record
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Found, content: { application/json: { schema: { allOf: [{ $ref: "#/components/schemas/SuccessDataResponse" }, { type: object, properties: { data: { $ref: "#/components/schemas/MobileCard" } } }] } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Card & Bank]
 *     summary: Delete a mobile card usage record
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200: { description: Deleted, content: { application/json: { schema: { $ref: "#/components/schemas/SuccessResponse" } } } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */
