/**
 * @openapi
 * components:
 *   schemas:
 *     Slide:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         image: { type: string, example: "1783029833165-872204938.png" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         Heading: { type: string, nullable: true, example: "Summer Sale" }
 *         bullet_1: { type: string, nullable: true }
 *         bullet_2: { type: string, nullable: true }
 *         bullet_3: { type: string, nullable: true }
 *         link: { type: string, nullable: true, example: "/products?sale=true" }
 *     SimpleImageResource:
 *       type: object
 *       description: Shared shape for home banners, application home banners, application slides and mobile sliders
 *       properties:
 *         id: { type: integer, example: 1 }
 *         image: { type: string, example: "1783029833165-872204938.png" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *     SideBanner:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         image: { type: string, example: "1783029833165-872204938.png" }
 *         status: { type: integer, enum: [0, 1], example: 1 }
 *         type: { type: string, example: "left" }
 */

/**
 * @openapi
 * /api/admin/slide/create:
 *   post:
 *     tags: [Admin Banners]
 *     summary: Create a homepage slide
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [status, image]
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               Heading: { type: string }
 *               bullet_1: { type: string }
 *               bullet_2: { type: string }
 *               bullet_3: { type: string }
 *               link: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Slide created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/Slide" } }
 *       422:
 *         description: Image required / validation error
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ValidationErrorResponse" }
 * /api/admin/slide:
 *   get:
 *     tags: [Admin Banners]
 *     summary: List slides
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
 *     responses:
 *       200:
 *         description: List of slides
 * /api/admin/slide/{id}:
 *   get:
 *     tags: [Admin Banners]
 *     summary: Get a single slide
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Slide found }
 *       404:
 *         description: Slide not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   put:
 *     tags: [Admin Banners]
 *     summary: Update a slide
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               Heading: { type: string }
 *               link: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200: { description: Slide updated }
 *       404:
 *         description: Slide not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 *   delete:
 *     tags: [Admin Banners]
 *     summary: Delete a slide
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Slide deleted }
 *       404:
 *         description: Slide not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 * /api/admin/slide/{id}/status:
 *   patch:
 *     tags: [Admin Banners]
 *     summary: Toggle slide active status (0/1)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Status toggled }
 *       404:
 *         description: Slide not found
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/ErrorResponse" }
 */

/**
 * @openapi
 * /api/admin/home-banner/create:
 *   post:
 *     tags: [Admin Banners]
 *     summary: Create a home banner
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [status, image]
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Home banner created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/SimpleImageResource" } }
 * /api/admin/home-banner:
 *   get:
 *     tags: [Admin Banners]
 *     summary: List home banners
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: status
 *         schema: { type: integer, enum: [0, 1] }
 *     responses:
 *       200: { description: List of home banners }
 * /api/admin/home-banner/{id}:
 *   get:
 *     tags: [Admin Banners]
 *     summary: Get a single home banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Home banner found }
 *       404: { description: Home banner not found }
 *   put:
 *     tags: [Admin Banners]
 *     summary: Update a home banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       200: { description: Home banner updated }
 *       404: { description: Home banner not found }
 *   delete:
 *     tags: [Admin Banners]
 *     summary: Delete a home banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Home banner deleted }
 *       404: { description: Home banner not found }
 * /api/admin/home-banner/{id}/status:
 *   patch:
 *     tags: [Admin Banners]
 *     summary: Toggle home banner active status (0/1)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Status toggled }
 *       404: { description: Home banner not found }
 */

/**
 * @openapi
 * /api/admin/application-home-banner/create:
 *   post:
 *     tags: [Admin Banners]
 *     summary: Create an in-app home banner
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [status, image]
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       201: { description: Application home banner created }
 * /api/admin/application-home-banner:
 *   get:
 *     tags: [Admin Banners]
 *     summary: List in-app home banners
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of application home banners }
 * /api/admin/application-home-banner/{id}:
 *   get:
 *     tags: [Admin Banners]
 *     summary: Get a single in-app home banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Found }
 *       404: { description: Not found }
 *   put:
 *     tags: [Admin Banners]
 *     summary: Update an in-app home banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *   delete:
 *     tags: [Admin Banners]
 *     summary: Delete an in-app home banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 * /api/admin/application-home-banner/{id}/status:
 *   patch:
 *     tags: [Admin Banners]
 *     summary: Toggle in-app home banner status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Status toggled }
 *       404: { description: Not found }
 */

/**
 * @openapi
 * /api/admin/side-banner/create:
 *   post:
 *     tags: [Admin Banners]
 *     summary: Create a side banner
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [status, type, image]
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               type: { type: string, example: "left" }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Side banner created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/SideBanner" } }
 * /api/admin/side-banner:
 *   get:
 *     tags: [Admin Banners]
 *     summary: List side banners
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of side banners }
 * /api/admin/side-banner/{id}:
 *   get:
 *     tags: [Admin Banners]
 *     summary: Get a single side banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Found }
 *       404: { description: Not found }
 *   put:
 *     tags: [Admin Banners]
 *     summary: Update a side banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               type: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *   delete:
 *     tags: [Admin Banners]
 *     summary: Delete a side banner
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 * /api/admin/side-banner/{id}/status:
 *   patch:
 *     tags: [Admin Banners]
 *     summary: Toggle side banner status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Status toggled }
 *       404: { description: Not found }
 */

/**
 * @openapi
 * /api/admin/application-slide/create:
 *   post:
 *     tags: [Admin Banners]
 *     summary: Create an in-app slide
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [status, image]
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       201: { description: Application slide created }
 * /api/admin/application-slide:
 *   get:
 *     tags: [Admin Banners]
 *     summary: List in-app slides
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of application slides }
 * /api/admin/application-slide/{id}:
 *   get:
 *     tags: [Admin Banners]
 *     summary: Get a single in-app slide
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Found }
 *       404: { description: Not found }
 *   put:
 *     tags: [Admin Banners]
 *     summary: Update an in-app slide
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *   delete:
 *     tags: [Admin Banners]
 *     summary: Delete an in-app slide
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 * /api/admin/application-slide/{id}/status:
 *   patch:
 *     tags: [Admin Banners]
 *     summary: Toggle in-app slide status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Status toggled }
 *       404: { description: Not found }
 */

/**
 * @openapi
 * /api/admin/mobile-slider/create:
 *   post:
 *     tags: [Admin Banners]
 *     summary: Create a mobile slider
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [status, image]
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       201: { description: Mobile slider created }
 * /api/admin/mobile-slider:
 *   get:
 *     tags: [Admin Banners]
 *     summary: List mobile sliders
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of mobile sliders }
 * /api/admin/mobile-slider/{id}:
 *   get:
 *     tags: [Admin Banners]
 *     summary: Get a single mobile slider
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Found }
 *       404: { description: Not found }
 *   put:
 *     tags: [Admin Banners]
 *     summary: Update a mobile slider
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: integer, enum: [0, 1] }
 *               image: { type: string, format: binary }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *   delete:
 *     tags: [Admin Banners]
 *     summary: Delete a mobile slider
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 * /api/admin/mobile-slider/{id}/status:
 *   patch:
 *     tags: [Admin Banners]
 *     summary: Toggle mobile slider status
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Status toggled }
 *       404: { description: Not found }
 */
