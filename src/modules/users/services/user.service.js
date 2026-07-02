import { Op } from "sequelize";
import {
  findUserByIdRepo,
  findAllUsersRepo,
  updateUserRepo,
  deleteUserRepo,
} from "../repositories/user.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const getUsersService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.is_active !== undefined && query.is_active !== "") {
    where.is_active = query.is_active;
  }

  if (query.search) {
    where[Op.or] = [
      { first_name: { [Op.like]: `%${query.search}%` } },
      { last_name: { [Op.like]: `%${query.search}%` } },
      { email: { [Op.like]: `%${query.search}%` } },
    ];
  }

  const { count, rows } = await findAllUsersRepo({ where, limit, offset });

  return { users: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getUserByIdService = async (id) => {
  const user = await findUserByIdRepo(id, true);
  if (!user) throw new Error("USER_NOT_FOUND");
  return user;
};

export const toggleUserStatusService = async (id) => {
  const user = await findUserByIdRepo(id);
  if (!user) throw new Error("USER_NOT_FOUND");

  const newStatus = Number(user.is_active) === 1 ? 0 : 1;
  return await updateUserRepo(id, { is_active: newStatus });
};

export const deleteUserService = async (id) => {
  const user = await findUserByIdRepo(id);
  if (!user) throw new Error("USER_NOT_FOUND");

  await deleteUserRepo(id);
  return true;
};
