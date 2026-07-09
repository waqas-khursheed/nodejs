import UserReward from "../../../database/models/UserReward.js";
import RewardSetting from "../../../database/models/RewardSetting.js";
import RewardsEarningMethod from "../../../database/models/RewardsEarningMethod.js";

export const getMyRewardBalanceService = async (userId) => {
  const userReward = await UserReward.findOne({ where: { user_id: userId } });
  return { rewards: userReward ? userReward.rewards : 0 };
};

export const getRewardSettingsService = async () => {
  const [redemptionRules, earningMethods] = await Promise.all([
    RewardSetting.findAll({ order: [["minimum_points", "ASC"]] }),
    RewardsEarningMethod.findAll({ order: [["id", "ASC"]] }),
  ]);

  return { redemptionRules, earningMethods };
};
