import Stock from "../../../database/models/Stock.js";
import Product from "../../../database/models/Product.js";
import AttributeItem from "../../../database/models/AttributeItem.js";

const detailIncludes = [
  { model: Product, as: "product" },
  { model: AttributeItem, as: "color" },
  { model: AttributeItem, as: "size" },
  { model: AttributeItem, as: "fitting" },
];

export const createStockRepo = async (data) => {
  return await Stock.create(data);
};

export const findStockByIdRepo = async (id) => {
  return await Stock.findByPk(id, { include: detailIncludes });
};

export const findAllStocksRepo = async ({ where, limit, offset }) => {
  return await Stock.findAndCountAll({
    where,
    limit,
    offset,
    distinct: true,
    include: detailIncludes,
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
