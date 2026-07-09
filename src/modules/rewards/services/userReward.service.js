import {
  findAllUserRewardsRepo,
  findUserRewardByIdRepo,
} from "../repositories/userReward.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const getUserRewardsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.user_id) {
    where.user_id = query.user_id;
  }

  const { count, rows } = await findAllUserRewardsRepo({ where, limit, offset });

  return { userRewards: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getUserRewardByIdService = async (id) => {
  const reward = await findUserRewardByIdRepo(id);
  if (!reward) throw new Error("USER_REWARD_NOT_FOUND");
  return reward;
};
