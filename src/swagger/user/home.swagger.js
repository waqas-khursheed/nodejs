/**
 * @openapi
 * /api/home:
 *   get:
 *     tags: [User Home & Content]
 *     summary: Get aggregated homepage content
 *     description: Returns all active slides/banners across every placement, plus new-arrival/best-seller/on-sale product rails, top-level categories and active brands — everything a storefront homepage needs in one call.
 *     responses:
 *       200:
 *         description: Home content fetched
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
 *                         slides: { type: array, items: { type: object } }
 *                         homeBanners: { type: array, items: { type: object } }
 *                         sideBanners: { type: array, items: { type: object } }
 *                         applicationSlides: { type: array, items: { type: object } }
 *                         applicationHomeBanners: { type: array, items: { type: object } }
 *                         mobileSliders: { type: array, items: { type: object } }
 *                         newArrivals: { type: array, items: { $ref: "#/components/schemas/UserProduct" } }
 *                         bestSellers: { type: array, items: { $ref: "#/components/schemas/UserProduct" } }
 *                         onSale: { type: array, items: { $ref: "#/components/schemas/UserProduct" } }
 *                         categories: { type: array, items: { $ref: "#/components/schemas/UserCategory" } }
 *                         brands: { type: array, items: { $ref: "#/components/schemas/Brand" } }
 */

/**
 * @openapi
 * /api/faqs:
 *   get:
 *     tags: [User Home & Content]
 *     summary: Get all FAQs grouped by category
 *     responses:
 *       200:
 *         description: FAQs fetched
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
 *                         categories:
 *                           type: array
 *                           items:
 *                             allOf:
 *                               - $ref: "#/components/schemas/FaqCategory"
 *                               - type: object
 *                                 properties:
 *                                   faqs:
 *                                     type: array
 *                                     items: { $ref: "#/components/schemas/Faq" }
 */

/**
 * @openapi
 * /api/contact-us-page:
 *   get:
 *     tags: [User Home & Content]
 *     summary: Get the active contact-us page config (map, content)
 *     responses:
 *       200:
 *         description: Contact us page fetched
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/ContactUsPage" } }
 *       404:
 *         description: Contact us page not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/pages/{slug}:
 *   get:
 *     tags: [User Home & Content]
 *     summary: Get a static content page (about-us, terms-conditions, privacy-policy, ...) by its page_name
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string, example: "about-us" }
 *     responses:
 *       200:
 *         description: Page found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/CommonPage" } }
 *       404:
 *         description: Page not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
