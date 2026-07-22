import { Op } from "sequelize";
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

export const findAllStocksRepo = async ({ where, limit, offset, search }) => {
  // Matches by the linked product's title — a stock row has no name of its
  // own, so "search" only makes sense against what the admin actually
  // recognizes the row by. `required: true` turns this include into an
  // INNER JOIN so the WHERE actually filters rows (a plain LEFT JOIN would
  // still return every stock row and just leave `product` fields null).
  const include = [
    {
      model: Product,
      as: "product",
      where: search ? { title: { [Op.like]: `%${search}%` } } : undefined,
      required: Boolean(search),
    },
    { model: AttributeItem, as: "color" },
    { model: AttributeItem, as: "size" },
    { model: AttributeItem, as: "fitting" },
  ];

  return await Stock.findAndCountAll({
    where,
    limit,
    offset,
    distinct: true,
    include,
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
