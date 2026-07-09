import adminRewardSettingRoute from "./routes/admin.rewardSetting.routes.js";
import adminRewardsEarningMethodRoute from "./routes/admin.rewardsEarningMethod.routes.js";
import adminUserRewardRoute from "./routes/admin.userReward.routes.js";
import userRewardRoute from "./routes/user.reward.routes.js";

const rewardModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/reward-setting", adminRewardSettingRoute);
  app.use("/api/admin/rewards-earning-method", adminRewardsEarningMethodRoute);
  app.use("/api/admin/user-reward", adminUserRewardRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/rewards", userRewardRoute);
};

export default rewardModule;
