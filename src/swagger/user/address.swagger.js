/**
 * @openapi
 * components:
 *   schemas:
 *     UserAddress:
 *       type: object
 *       description: Singleton saved address per user — primary (1) and optional secondary (2) slots
 *       properties:
 *         id: { type: integer, example: 1 }
 *         address1: { type: string, example: "House 1, Street 2" }
 *         country_id1: { type: integer, example: 1 }
 *         state_id1: { type: integer, example: 1 }
 *         city_id1: { type: integer, example: 1 }
 *         code1: { type: string, example: "54000" }
 *         address2: { type: string, nullable: true }
 *         country_id2: { type: integer, nullable: true }
 *         state_id2: { type: integer, nullable: true }
 *         city_id2: { type: integer, nullable: true }
 *         code2: { type: string, nullable: true }
 */

/**
 * @openapi
 * /api/address:
 *   get:
 *     tags: [User Addresses]
 *     summary: Get the logged-in user's saved address
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Address found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/UserAddress" } }
 *       404:
 *         description: No saved address found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [User Addresses]
 *     summary: Create or update the saved address (upsert)
 *     description: On first save, address1/country_id1/state_id1/city_id1/code1 are required.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address1: { type: string, example: "House 1, Street 2" }
 *               country_id1: { type: integer, example: 1 }
 *               state_id1: { type: integer, example: 1 }
 *               city_id1: { type: integer, example: 1 }
 *               code1: { type: string, example: "54000" }
 *               address2: { type: string }
 *               country_id2: { type: integer }
 *               state_id2: { type: integer }
 *               city_id2: { type: integer }
 *               code2: { type: string }
 *     responses:
 *       200:
 *         description: Address saved
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/UserAddress" } }
 *       422:
 *         description: Missing required fields, or country/state/city does not exist
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
