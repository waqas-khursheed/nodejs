import ProductCity from "../../../database/models/ProductCity.js";
import City from "../../../database/models/City.js";

export const findProductCitiesRepo = async (productId) => {
  return await ProductCity.findAll({
    where: { product_id: productId },
    include: [{ model: City, as: "city" }],
    order: [["id", "ASC"]],
  });
};

export const findCitiesByIdsRepo = async (cityIds) => {
  return await City.findAll({ where: { id: cityIds } });
};

export const syncProductCitiesRepo = async (productId, cityIds) => {
  await ProductCity.destroy({ where: { product_id: productId } });

  if (cityIds && cityIds.length > 0) {
    const rows = cityIds.map((city_id) => ({ product_id: productId, city_id }));
    await ProductCity.bulkCreate(rows);
  }
};
