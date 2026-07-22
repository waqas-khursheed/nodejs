import { Op } from "sequelize";
import UserReward from "../../../database/models/UserReward.js";
import User from "../../../database/models/User.js";

const detailIncludes = [
  { model: User, as: "user", attributes: ["id", "first_name", "last_name", "email"] },
];

export const findAllUserRewardsRepo = async ({ where, limit, offset, search }) => {
  // Matches the linked customer's name/email — a user_rewards row has no
  // name of its own on the admin list. `required: true` turns this into an
  // INNER JOIN so the WHERE actually filters (a LEFT JOIN would still return
  // every row and just leave `user` fields null on a non-match).
  const include = [
    {
      model: User,
      as: "user",
      attributes: ["id", "first_name", "last_name", "email"],
      where: search
        ? {
            [Op.or]: [
              { first_name: { [Op.like]: `%${search}%` } },
              { last_name: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } },
            ],
          }
        : undefined,
      required: Boolean(search),
    },
  ];

  return await UserReward.findAndCountAll({
    where,
    limit,
    offset,
    include,
    order: [["id", "DESC"]],
  });
};

export const findUserRewardByIdRepo = async (id) => {
  return await UserReward.findByPk(id, { include: detailIncludes });
};
