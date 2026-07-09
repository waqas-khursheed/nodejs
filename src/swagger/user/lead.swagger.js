/**
 * @openapi
 * /api/subscribe:
 *   post:
 *     tags: [User Leads]
 *     summary: Subscribe to the newsletter
 *     description: Idempotent — subscribing again with an email that unsubscribed (status 0) re-activates it instead of erroring.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties: { email: { type: string, example: "subscriber@example.com" } }
 *     responses:
 *       201:
 *         description: Subscribed successfully
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessDataResponse" }
 */

/**
 * @openapi
 * /api/contact-us:
 *   post:
 *     tags: [User Leads]
 *     summary: Submit the contact-us form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, description]
 *             properties:
 *               name: { type: string, example: "Ali Raza" }
 *               email: { type: string, example: "ali@example.com" }
 *               phone: { type: string, example: "03001234567" }
 *               description: { type: string, example: "I have a question about my order." }
 *     responses:
 *       201:
 *         description: Message sent
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessDataResponse" }
 */
