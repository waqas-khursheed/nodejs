/**
 * @openapi
 * /api/rewards/settings:
 *   get:
 *     tags: [User Rewards]
 *     summary: Get the public reward program rules (earning + redemption)
 *     responses:
 *       200:
 *         description: Reward settings fetched
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
 *                         redemptionRules:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/RewardSetting" }
 *                         earningMethods:
 *                           type: array
 *                           items: { $ref: "#/components/schemas/RewardsEarningMethod" }
 */

/**
 * @openapi
 * /api/rewards/balance:
 *   get:
 *     tags: [User Rewards]
 *     summary: Get the logged-in user's current reward point balance
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Balance fetched
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/SuccessDataResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties: { rewards: { type: number, example: 45.5 } }
 */
