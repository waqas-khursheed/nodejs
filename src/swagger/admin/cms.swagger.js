/**
 * @openapi
 * components:
 *   schemas:
 *     FaqCategory:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "Orders & Shipping" }
 *     Faq:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         question: { type: string, example: "How long does delivery take?" }
 *         answer: { type: string, example: "Standard delivery takes 3-5 business days." }
 *         slug: { type: string, example: "how-long-does-delivery-take" }
 *         category_id: { type: integer, example: 1 }
 *         created_at: { type: string, format: date-time }
 *         category: { $ref: "#/components/schemas/FaqCategory" }
 *     CommonPage:
 *       type: object
 *       description: Static content pages (about-us, terms-conditions, privacy-policy, ...)
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "About Us" }
 *         slug: { type: string, example: "about-us" }
 *         heading: { type: string, nullable: true, example: "Who we are" }
 *         content: { type: string, example: "<p>We are a fashion ecommerce store...</p>" }
 *         image: { type: string, nullable: true, example: "1720000000000-123456789.jpg" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         page_name: { type: string, example: "about-us" }
 *     ContactUsPage:
 *       type: object
 *       description: Singleton config row for the contact-us page
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "Contact Us" }
 *         slug: { type: string, example: "contact-us" }
 *         content: { type: string, example: "<p>Reach out to us anytime.</p>" }
 *         map: { type: string, nullable: true, example: "<iframe src=...></iframe>" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 */

/**
 * @openapi
 * /api/admin/faq-category/create:
 *   post:
 *     tags: [Admin FAQ]
 *     summary: Create an FAQ category
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, example: "Orders & Shipping" }
 *     responses:
 *       201:
 *         description: FAQ category created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/FaqCategory" } }
 * /api/admin/faq-category:
 *   get:
 *     tags: [Admin FAQ]
 *     summary: List FAQ categories
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
 *     responses:
 *       200:
 *         description: List of FAQ categories
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
 *                         faqCategories:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/FaqCategory" }
 *                         meta: { type: object }
 * /api/admin/faq-category/{id}:
 *   get:
 *     tags: [Admin FAQ]
 *     summary: Get an FAQ category
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: FAQ category found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/FaqCategory" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin FAQ]
 *     summary: Update an FAQ category
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: { title: { type: string } }
 *     responses:
 *       200:
 *         description: FAQ category updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/FaqCategory" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin FAQ]
 *     summary: Delete an FAQ category
 *     description: Blocked with 409 if the category still has FAQs assigned to it.
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: FAQ category deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *       409: { description: Category still has FAQs, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/faq/create:
 *   post:
 *     tags: [Admin FAQ]
 *     summary: Create an FAQ
 *     description: slug is auto-generated from `question`.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [question, answer, category_id]
 *             properties:
 *               question: { type: string, example: "How long does delivery take?" }
 *               answer: { type: string, example: "Standard delivery takes 3-5 business days." }
 *               category_id: { type: integer, example: 1 }
 *     responses:
 *       201:
 *         description: FAQ created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Faq" } }
 *       422:
 *         description: Category does not exist
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 * /api/admin/faq:
 *   get:
 *     tags: [Admin FAQ]
 *     summary: List FAQs (optionally filtered by category)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: category_id
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of FAQs
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
 *                         faqs:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/Faq" }
 *                         meta: { type: object }
 * /api/admin/faq/{id}:
 *   get:
 *     tags: [Admin FAQ]
 *     summary: Get an FAQ
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: FAQ found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Faq" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin FAQ]
 *     summary: Update an FAQ
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question: { type: string }
 *               answer: { type: string }
 *               category_id: { type: integer }
 *     responses:
 *       200:
 *         description: FAQ updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Faq" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin FAQ]
 *     summary: Delete an FAQ
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: FAQ deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/page/create:
 *   post:
 *     tags: [Admin CMS Pages]
 *     summary: Create a static CMS page
 *     description: page_name must be unique (e.g. "about-us", "terms-conditions", "privacy-policy").
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, content, page_name]
 *             properties:
 *               title: { type: string, example: "About Us" }
 *               heading: { type: string, example: "Who we are" }
 *               content: { type: string, example: "<p>We are a fashion ecommerce store...</p>" }
 *               status: { type: integer, enum: [0, 1], default: 1 }
 *               page_name: { type: string, example: "about-us" }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Page created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/CommonPage" } }
 *       409:
 *         description: page_name already exists
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 * /api/admin/page:
 *   get:
 *     tags: [Admin CMS Pages]
 *     summary: List static pages
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: integer, enum: [0, 1] }
 *       - in: query
 *         name: page_name
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of pages
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
 *                         pages:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/CommonPage" }
 *                         meta: { type: object }
 * /api/admin/page/{id}:
 *   get:
 *     tags: [Admin CMS Pages]
 *     summary: Get a static page
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
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
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin CMS Pages]
 *     summary: Update a static page
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               heading: { type: string }
 *               content: { type: string }
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Page updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/CommonPage" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin CMS Pages]
 *     summary: Delete a static page
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *     responses:
 *       200:
 *         description: Page deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/contact-us-page:
 *   get:
 *     tags: [Admin CMS Pages]
 *     summary: Get the contact-us page config
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Contact us page found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/ContactUsPage" } }
 *       404:
 *         description: Not configured yet
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin CMS Pages]
 *     summary: Create/update the contact-us page config (upsert singleton)
 *     description: If no row exists yet, `title` and `content` are required to create the first one.
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: "Contact Us" }
 *               content: { type: string, example: "<p>Reach out to us anytime.</p>" }
 *               map: { type: string, example: "<iframe src=...></iframe>" }
 *               status: { type: integer, enum: [0, 1] }
 *     responses:
 *       200:
 *         description: Contact us page updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/ContactUsPage" } }
 *       422:
 *         description: title/content required for initial creation
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */
