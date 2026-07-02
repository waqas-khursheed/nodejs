/**
 * @openapi
 * /api/admin/auth/login:
 *   post:
 *     tags: [Admin Auth]
 *     summary: Admin login
 *     description: Authenticates an admin using email + password and returns a JWT bearer token. Rate-limited to 10 attempts per 15 minutes per IP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: superadmin@admin.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean, example: true }
 *                 message: { type: string, example: "Admin login successful" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     admin:
 *                       type: object
 *                       properties:
 *                         id: { type: integer, example: 1 }
 *                         name: { type: string, example: "Super Admin" }
 *                         email: { type: string, example: "superadmin@admin.com" }
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean, example: false }
 *                 message: { type: string, example: "Validation Failed" }
 *                 errors:
 *                   type: object
 *                   example: { email: "Invalid email or password" }
 *       422:
 *         description: Validation error (missing/invalid email or password)
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 *       429:
 *         description: Too many login attempts
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
