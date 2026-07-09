/**
 * @openapi
 * components:
 *   schemas:
 *     RewardSetting:
 *       type: object
 *       description: "Redemption rule: `minimum_points` needed to redeem `points` worth `equal_to` currency units"
 *       properties:
 *         id: { type: integer, example: 1 }
 *         minimum_points: { type: integer, example: 100 }
 *         points: { type: integer, example: 100 }
 *         equal_to: { type: integer, example: 10 }
 *     RewardsEarningMethod:
 *       type: object
 *       description: "Earning rule: spend `purchase` currency units to earn `equals_to` points"
 *       properties:
 *         id: { type: integer, example: 1 }
 *         purchase: { type: integer, example: 100 }
 *         equals_to: { type: integer, example: 5 }
 *     UserReward:
 *       type: object
 *       description: Read-only — a customer's current reward point balance
 *       properties:
 *         id: { type: integer, example: 1 }
 *         user_id: { type: integer, example: 1 }
 *         rewards: { type: number, example: 45.5 }
 *         user:
 *           type: object
 *           properties:
 *             id: { type: integer }
 *             first_name: { type: string }
 *             email: { type: string }
 */

/**
 * @openapi
 * /api/admin/reward-setting/create:
 *   post:
 *     tags: [Admin Rewards]
 *     summary: Create a redemption rule
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [minimum_points, points, equal_to]
 *             properties:
 *               minimum_points: { type: integer, example: 100 }
 *               points: { type: integer, example: 100 }
 *               equal_to: { type: integer, example: 10 }
 *     responses:
 *       201:
 *         description: Reward setting created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/RewardSetting" } }
 * /api/admin/reward-setting:
 *   get:
 *     tags: [Admin Rewards]
 *     summary: List redemption rules
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of reward settings
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
 *                         rewardSettings:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/RewardSetting" }
 *                         meta: { type: object }
 * /api/admin/reward-setting/{id}:
 *   get:
 *     tags: [Admin Rewards]
 *     summary: Get a redemption rule
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reward setting found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/RewardSetting" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Rewards]
 *     summary: Update a redemption rule
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minimum_points: { type: integer }
 *               points: { type: integer }
 *               equal_to: { type: integer }
 *     responses:
 *       200:
 *         description: Reward setting updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/RewardSetting" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Rewards]
 *     summary: Delete a redemption rule
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reward setting deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/rewards-earning-method/create:
 *   post:
 *     tags: [Admin Rewards]
 *     summary: Create a points-earning rule
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [purchase, equals_to]
 *             properties:
 *               purchase: { type: integer, example: 100 }
 *               equals_to: { type: integer, example: 5 }
 *     responses:
 *       201:
 *         description: Earning method created
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/RewardsEarningMethod" } }
 * /api/admin/rewards-earning-method:
 *   get:
 *     tags: [Admin Rewards]
 *     summary: List points-earning rules
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of earning methods
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
 *                         rewardsEarningMethods:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/RewardsEarningMethod" }
 *                         meta: { type: object }
 * /api/admin/rewards-earning-method/{id}:
 *   get:
 *     tags: [Admin Rewards]
 *     summary: Get a points-earning rule
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Earning method found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/RewardsEarningMethod" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   put:
 *     tags: [Admin Rewards]
 *     summary: Update a points-earning rule
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purchase: { type: integer }
 *               equals_to: { type: integer }
 *     responses:
 *       200:
 *         description: Earning method updated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/RewardsEarningMethod" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 *   delete:
 *     tags: [Admin Rewards]
 *     summary: Delete a points-earning rule
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Earning method deleted
 *         content:
 *           application/json:
 *             schema: { $ref: "#/components/schemas/SuccessResponse" }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */

/**
 * @openapi
 * /api/admin/user-reward:
 *   get:
 *     tags: [Admin Rewards]
 *     summary: List customer reward balances (read-only)
 *     description: Balances are maintained automatically by the order/rewards flow — there is no admin create/update here.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: user_id
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: List of user reward balances
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
 *                         userRewards:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/UserReward" }
 *                         meta: { type: object }
 * /api/admin/user-reward/{id}:
 *   get:
 *     tags: [Admin Rewards]
 *     summary: Get a single user's reward balance
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: User reward found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties: { data: { $ref: "#/components/schemas/UserReward" } }
 *       404: { description: Not found, content: { application/json: { schema: { $ref: "#/components/schemas/ErrorResponse" } } } }
 */
