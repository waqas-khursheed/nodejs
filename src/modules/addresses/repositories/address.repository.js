import UserAddress from "../../../database/models/UserAddress.js";
import Country from "../../../database/models/Country.js";
import State from "../../../database/models/State.js";
import City from "../../../database/models/City.js";

const detailIncludes = [
  { model: Country, as: "country1" },
  { model: State, as: "state1" },
  { model: City, as: "city1" },
  { model: Country, as: "country2" },
  { model: State, as: "state2" },
  { model: City, as: "city2" },
];

export const findAddressByUserRepo = async (userId) => {
  return await UserAddress.findOne({ where: { user_id: userId }, include: detailIncludes });
};

export const createAddressRepo = async (data) => {
  return await UserAddress.create(data);
};

export const updateAddressRepo = async (id, data) => {
  await UserAddress.update(data, { where: { id } });
  return await UserAddress.findByPk(id, { include: detailIncludes });
};
