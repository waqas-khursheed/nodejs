import { findAddressByUserRepo, createAddressRepo, updateAddressRepo } from "../repositories/address.repository.js";
import Country from "../../../database/models/Country.js";
import State from "../../../database/models/State.js";
import City from "../../../database/models/City.js";

const validateLocation = async (countryId, stateId, cityId, suffix) => {
  if (countryId === undefined) return;

  const country = await Country.findByPk(countryId);
  if (!country) throw new Error(`COUNTRY_NOT_FOUND_${suffix}`);

  const state = await State.findByPk(stateId);
  if (!state) throw new Error(`STATE_NOT_FOUND_${suffix}`);

  const city = await City.findByPk(cityId);
  if (!city) throw new Error(`CITY_NOT_FOUND_${suffix}`);
};

export const getAddressService = async (userId) => {
  const address = await findAddressByUserRepo(userId);
  if (!address) throw new Error("ADDRESS_NOT_FOUND");
  return address;
};

export const upsertAddressService = async (userId, data) => {
  await validateLocation(data.country_id1, data.state_id1, data.city_id1, "1");

  if (data.country_id2 !== undefined) {
    await validateLocation(data.country_id2, data.state_id2, data.city_id2, "2");
  }

  const existing = await findAddressByUserRepo(userId);

  if (!existing) {
    if (!data.address1 || !data.country_id1 || !data.state_id1 || !data.city_id1 || !data.code1) {
      throw new Error("PRIMARY_ADDRESS_REQUIRED");
    }
    const created = await createAddressRepo({ user_id: userId, ...data });
    return await findAddressByUserRepo(userId) ?? created;
  }

  return await updateAddressRepo(existing.id, data);
};
