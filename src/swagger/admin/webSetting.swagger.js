/**
 * @openapi
 * components:
 *   schemas:
 *     WebSetting:
 *       type: object
 *       description: Singleton site-wide configuration row
 *       properties:
 *         id: { type: integer, example: 1 }
 *         main_logo: { type: string, nullable: true, example: "1720000000000-123456789.png" }
 *         fav_icon: { type: string, nullable: true, example: "1720000000000-987654321.png" }
 *         payment_logo: { type: string, nullable: true }
 *         website_link: { type: string, nullable: true, example: "https://example.com" }
 *         website_name: { type: string, nullable: true, example: "My Ecommerce Store" }
 *         meta_keywords: { type: string, nullable: true }
 *         meta_description: { type: string, nullable: true }
 *         address: { type: string, nullable: true }
 *         email: { type: string, nullable: true, example: "support@example.com" }
 *         phone_one: { type: string, nullable: true }
 *         phone_two: { type: string, nullable: true }
 *         copyright: { type: string, nullable: true }
 *         footer_widget_1: { type: string, nullable: true }
 *         footer_widget_2: { type: string, nullable: true }
 *         footer_widget_3: { type: string, nullable: true }
 *         footer_widget_4: { type: string, nullable: true }
 *         service_for: { type: string, example: "both" }
 *         dynamic_module_name: { type: string, example: "Brand" }
 *         delivery_days: { type: string, nullable: true }
 *         delivery_start_time: { type: string, example: "09:00:00" }
 *         delivery_end_time: { type: string, example: "18:00:00" }
 *         min_amount_for_free_delivery: { type: integer, example: 0 }
 *         shipping_rate: { type: integer, example: 0 }
 *         location_mod: { type: integer, enum: [0, 1] }
 *         delivery_days_time_mod: { type: integer, enum: [0, 1] }
 *         footer_payment_logo_mod: { type: integer, enum: [0, 1] }
 */

/**
 * @openapi
 * /api/admin/web-setting:
 *   get:
 *     tags: [Admin Web Settings]
 *     summary: Get the site-wide settings
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Settings found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/WebSetting" } }
 *       404:
 *         description: Not configured yet
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Web Settings]
 *     summary: Create/update the site-wide settings (upsert singleton)
 *     description: >
 *       On first-ever save, `delivery_start_time`, `delivery_end_time`,
 *       `delivery_days_time_mod` and `footer_payment_logo_mod` are required.
 *       Logo fields (main_logo/fav_icon/payment_logo) are optional file uploads —
 *       omit them to leave the existing logo unchanged.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               website_name: { type: string, example: "My Ecommerce Store" }
 *               website_link: { type: string, example: "https://example.com" }
 *               email: { type: string, example: "support@example.com" }
 *               phone_one: { type: string, example: "+92 300 1234567" }
 *               address: { type: string, example: "123 Main Street, Lahore" }
 *               copyright: { type: string, example: "© 2026 My Store" }
 *               delivery_start_time: { type: string, example: "09:00:00" }
 *               delivery_end_time: { type: string, example: "18:00:00" }
 *               min_amount_for_free_delivery: { type: integer, example: 5000 }
 *               shipping_rate: { type: integer, example: 200 }
 *               location_mod: { type: integer, enum: [0, 1] }
 *               delivery_days_time_mod: { type: integer, enum: [0, 1], example: 1 }
 *               footer_payment_logo_mod: { type: integer, enum: [0, 1], example: 1 }
 *               main_logo: { type: string, format: binary }
 *               fav_icon: { type: string, format: binary }
 *               payment_logo: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Settings updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/WebSetting" } }
 *       422:
 *         description: Required fields missing for initial setup
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
