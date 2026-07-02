import { Op } from "sequelize";
import User from "../../../database/models/User.js";
import UserAddress from "../../../database/models/UserAddress.js";

const detailIncludes = [{ model: UserAddress, as: "userAddresses" }];

const publicAttributes = {
  exclude: ["password", "auth_token", "remember_token"],
};

export const findUserByIdRepo = async (id, withRelations = false) => {
  return await User.findByPk(id, {
    attributes: publicAttributes,
    include: withRelations ? detailIncludes : [],
  });
};

export const findAllUsersRepo = async ({ where, limit, offset }) => {
  return await User.findAndCountAll({
    where,
    limit,
    offset,
    attributes: publicAttributes,
    order: [["id", "DESC"]],
  });
};

export const updateUserRepo = async (id, data) => {
  await User.update(data, { where: { id } });
  return await findUserByIdRepo(id);
};

export const deleteUserRepo = async (id) => {
  return await User.destroy({ where: { id } });
};
