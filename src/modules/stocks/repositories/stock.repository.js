import Stock from "../../../database/models/Stock.js";
import Product from "../../../database/models/Product.js";

export const createStockRepo = async (data) => {
  return await Stock.create(data);
};

export const findStockByIdRepo = async (id) => {
  return await Stock.findByPk(id, { include: [{ model: Product, as: "product" }] });
};

export const findAllStocksRepo = async ({ where, limit, offset }) => {
  return await Stock.findAndCountAll({
    where,
    limit,
    offset,
    include: [{ model: Product, as: "product" }],
    order: [["id", "DESC"]],
  });
};

export const updateStockRepo = async (id, data) => {
  await Stock.update(data, { where: { id } });
  return await findStockByIdRepo(id);
};

export const deleteStockRepo = async (id) => {
  return await Stock.destroy({ where: { id } });
};
