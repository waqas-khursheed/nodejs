import UserReward from "../../../database/models/UserReward.js";
import User from "../../../database/models/User.js";

const detailIncludes = [
  { model: User, as: "user", attributes: ["id", "first_name", "last_name", "email"] },
];

export const findAllUserRewardsRepo = async ({ where, limit, offset }) => {
  return await UserReward.findAndCountAll({
    where,
    limit,
    offset,
    include: detailIncludes,
    order: [["id", "DESC"]],
  });
};

export const findUserRewardByIdRepo = async (id) => {
  return await UserReward.findByPk(id, { include: detailIncludes });
};
