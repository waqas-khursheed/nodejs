import Exchange from "../../../database/models/Exchange.js";

export const createExchangeRepo = async (data) => {
  return await Exchange.create(data);
};
