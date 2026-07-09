/**
 * @openapi
 * components:
 *   schemas:
 *     UserAccount:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         first_name: { type: string, example: "Test" }
 *         last_name: { type: string, nullable: true, example: "Buyer" }
 *         username: { type: string, nullable: true }
 *         email: { type: string, example: "buyer1@example.com" }
 *         phone: { type: string, example: "03001234567" }
 *         type: { type: string, nullable: true }
 *         company_name: { type: string, nullable: true }
 *         is_active: { type: integer, enum: [0, 1], example: 1 }
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [User Auth]
 *     summary: Register a new customer account
 *     description: >
 *       If an X-Device-Id header is sent, that device's guest cart (added via
 *       `POST /api/cart` before registering) is automatically merged into the
 *       new account's cart.
 *     parameters:
 *       - $ref: "#/components/parameters/DeviceIdHeader"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, phone, email, password]
 *             properties:
 *               first_name: { type: string, example: "Test" }
 *               last_name: { type: string, example: "Buyer" }
 *               email: { type: string, example: "buyer1@example.com" }
 *               phone: { type: string, example: "03001234567" }
 *               password: { type: string, example: "secret123" }
 *               type: { type: string, example: "retail" }
 *     responses:
 *       201:
 *         description: Registered successfully
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
 *                         user: { $ref: "#/components/schemas/UserAccount" }
 *                         token: { type: string }
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [User Auth]
 *     summary: Log in with email and password
 *     description: >
 *       If an X-Device-Id header is sent, that device's guest cart is
 *       automatically merged into this account's cart.
 *     parameters:
 *       - $ref: "#/components/parameters/DeviceIdHeader"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "buyer1@example.com" }
 *               password: { type: string, example: "secret123" }
 *     responses:
 *       200:
 *         description: Login successful
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
 *                         user: { $ref: "#/components/schemas/UserAccount" }
 *                         token: { type: string }
 *       401:
 *         description: Invalid credentials or inactive account
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     tags: [User Auth]
 *     summary: Request a password-reset code
 *     description: >
 *       No mail service is wired up yet — in non-production environments the
 *       generated code is returned directly in the response as `debug_code`
 *       so the flow can be tested end-to-end. In production this would be
 *       emailed/SMS'd instead.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties: { email: { type: string, example: "buyer1@example.com" } }
 *     responses:
 *       200:
 *         description: Reset code generated
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
 *                         message: { type: string }
 *                         debug_code: { type: string, example: "482913", nullable: true }
 *       404:
 *         description: No account found with this email
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     tags: [User Auth]
 *     summary: Reset password using the OTP code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code, password]
 *             properties:
 *               email: { type: string, example: "buyer1@example.com" }
 *               code: { type: string, example: "482913" }
 *               password: { type: string, example: "newSecret456" }
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       422:
 *         description: Invalid or expired reset code
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     tags: [User Auth]
 *     summary: Get the logged-in user's profile
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Profile fetched
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/UserAccount" } }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/UnauthorizedResponse" }
 *   put:
 *     tags: [User Auth]
 *     summary: Update the logged-in user's profile
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name: { type: string }
 *               last_name: { type: string }
 *               username: { type: string }
 *               phone: { type: string }
 *               company_name: { type: string }
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/UserAccount" } }
 */

/**
 * @openapi
 * /api/auth/change-password:
 *   post:
 *     tags: [User Auth]
 *     summary: Change password (logged-in)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [old_password, new_password]
 *             properties:
 *               old_password: { type: string, example: "secret123" }
 *               new_password: { type: string, example: "newSecret456" }
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       422:
 *         description: Old password is incorrect
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
