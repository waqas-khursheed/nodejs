import { createExchangeRepo } from "../repositories/exchange.repository.js";

export const createExchangeService = async (data) => {
  return await createExchangeRepo({ ...data, seen: 0 });
};
