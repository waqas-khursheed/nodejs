import {
  createExchangeRepo,
  findOrderByNumberRepo,
  findExchangeByIdRepo,
  findAllExchangesRepo,
  markExchangeSeenRepo,
  deleteExchangeRepo,
} from "../repositories/exchange.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

// Previously any free-text order_number was accepted with no check that the
// order actually exists — anyone could submit an exchange request for an
// order that never happened. Now the order must exist, and (when the
// requester provides an email) it must match the order's billing/account
// email, so a stranger can't file exchange requests against someone else's
// order using only a guessed order number.
export const createExchangeService = async (data) => {
  const order = await findOrderByNumberRepo(data.order_number);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  if (data.email) {
    const orderEmails = [order.user?.email, order.billingDetails?.email]
      .filter(Boolean)
      .map((e) => e.toLowerCase());

    if (orderEmails.length && !orderEmails.includes(data.email.toLowerCase())) {
      throw new Error("ORDER_EMAIL_MISMATCH");
    }
  }

  return await createExchangeRepo({ ...data, order_id: order.id, seen: 0 });
};

export const getExchangesService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.seen !== undefined && query.seen !== "") {
    where.seen = query.seen;
  }

  const { count, rows } = await findAllExchangesRepo({ where, limit, offset });

  return { exchanges: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getExchangeByIdService = async (id) => {
  const exchange = await findExchangeByIdRepo(id);
  if (!exchange) throw new Error("EXCHANGE_NOT_FOUND");
  return exchange;
};

export const markExchangeSeenService = async (id) => {
  const exchange = await findExchangeByIdRepo(id);
  if (!exchange) throw new Error("EXCHANGE_NOT_FOUND");

  return await markExchangeSeenRepo(id);
};

export const deleteExchangeService = async (id) => {
  const exchange = await findExchangeByIdRepo(id);
  if (!exchange) throw new Error("EXCHANGE_NOT_FOUND");

  await deleteExchangeRepo(id);
  return true;
};
