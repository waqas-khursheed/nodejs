/**
 * @openapi
 * components:
 *   schemas:
 *     UserBrief:
 *       type: object
 *       description: Minimal user info embedded in other responses
 *       properties:
 *         id: { type: integer, example: 1 }
 *         first_name: { type: string, example: "Test" }
 *         last_name: { type: string, nullable: true, example: "User" }
 *         email: { type: string, example: "testuser1@example.com" }
 *     User:
 *       type: object
 *       description: Password / auth_token / remember_token are never returned by admin endpoints
 *       properties:
 *         id: { type: integer, example: 1 }
 *         first_name: { type: string, example: "Test" }
 *         last_name: { type: string, nullable: true }
 *         username: { type: string, nullable: true }
 *         phone: { type: string, nullable: true }
 *         email: { type: string, example: "testuser1@example.com" }
 *         email_verified_at: { type: string, format: date-time, nullable: true }
 *         type: { type: string, nullable: true }
 *         company_name: { type: string, nullable: true }
 *         is_active: { type: integer, enum: [0, 1], example: 1 }
 *         created_at: { type: string, format: date-time }
 *         updated_at: { type: string, format: date-time }
 *         userAddresses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id: { type: integer }
 *               address1: { type: string }
 *               code1: { type: string }
 */

/**
 * @openapi
 * /api/admin/user:
 *   get:
 *     tags: [Admin Users]
 *     summary: List customer accounts (paginated, searchable, filterable)
 *     description: Never returns password/token fields. Users self-register via the user-side auth API.
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
 *         description: Matches against first_name, last_name, or email
 *       - in: query
 *         name: is_active
 *         schema: { type: integer, enum: [0, 1] }
 *     responses:
 *       200:
 *         description: List of users
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
 *                         users:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/User" }
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
 * /api/admin/user/{id}:
 *   get:
 *     tags: [Admin Users]
 *     summary: Get a single user (with saved addresses)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/User" } }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Users]
 *     summary: Delete a user account
 *     description: >
 *       Cascades: reviews, reset_password_codes, user_rewards, user_addresses are
 *       deleted. Orders/carts/wishlists/used_coupons keep their rows with user_id set to NULL.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/user/{id}/status:
 *   patch:
 *     tags: [Admin Users]
 *     summary: Toggle user active status (0/1) — deactivating blocks login
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
 *                   properties: { data: { $ref: "#/components/schemas/User" } }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
