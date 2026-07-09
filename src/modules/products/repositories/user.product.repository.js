import { Op } from "sequelize";
import Product from "../../../database/models/Product.js";
import Brand from "../../../database/models/Brand.js";
import ProductGallery from "../../../database/models/ProductGallery.js";
import AssignCatToProduct from "../../../database/models/AssignCatToProduct.js";
import ProductCategory from "../../../database/models/ProductCategory.js";
import AssignAttrToProduct from "../../../database/models/AssignAttrToProduct.js";
import AttributeItem from "../../../database/models/AttributeItem.js";
import ProductAttribute from "../../../database/models/ProductAttribute.js";
import AssignTagToProduct from "../../../database/models/AssignTagToProduct.js";
import ProductTag from "../../../database/models/ProductTag.js";
import Stock from "../../../database/models/Stock.js";

const detailIncludes = [
  { model: Brand, as: "brand" },
  { model: ProductGallery, as: "productGalleries" },
  {
    model: AssignCatToProduct,
    as: "assignCatToProducts",
    include: [{ model: ProductCategory, as: "category" }],
  },
  {
    model: AssignAttrToProduct,
    as: "assignAttrToProducts",
    include: [{ model: AttributeItem, as: "attribute", include: [{ model: ProductAttribute, as: "attribute" }] }],
  },
  {
    model: AssignTagToProduct,
    as: "assignTagToProducts",
    include: [{ model: ProductTag, as: "tag" }],
  },
  { model: Stock, as: "stocks" },
];

export const findActiveProductsRepo = async ({
  where,
  limit,
  offset,
  order,
  categorySlug,
  brandSlug,
  tagSlug,
}) => {
  const include = [
    {
      model: Brand,
      as: "brand",
      where: brandSlug ? { slug: brandSlug } : undefined,
      required: Boolean(brandSlug),
    },
  ];

  if (categorySlug) {
    include.push({
      model: AssignCatToProduct,
      as: "assignCatToProducts",
      required: true,
      attributes: [],
      include: [
        { model: ProductCategory, as: "category", where: { slug: categorySlug, status: 1 }, attributes: [] },
      ],
    });
  }

  if (tagSlug) {
    include.push({
      model: AssignTagToProduct,
      as: "assignTagToProducts",
      required: true,
      attributes: [],
      include: [{ model: ProductTag, as: "tag", where: { slug: tagSlug }, attributes: [] }],
    });
  }

  return await Product.findAndCountAll({
    where,
    limit,
    offset,
    order,
    include,
    distinct: true,
  });
};

export const findActiveProductBySlugRepo = async (slug) => {
  return await Product.findOne({
    where: { slug, status: 1 },
    include: detailIncludes,
  });
};

export const findRelatedProductsRepo = async ({ productId, categoryIds, limit }) => {
  if (!categoryIds || categoryIds.length === 0) return [];

  return await Product.findAll({
    where: { status: 1, id: { [Op.ne]: productId } },
    include: [
      { model: Brand, as: "brand" },
      {
        model: AssignCatToProduct,
        as: "assignCatToProducts",
        required: true,
        attributes: [],
        where: { category_id: categoryIds },
      },
    ],
    limit,
    subQuery: false,
    order: [["id", "DESC"]],
  });
};

export const findStockForVariationRepo = async (productId, { size_id, color_id, fitting_id } = {}) => {
  const where = { product_id: productId };
  if (size_id !== undefined) where.size_id = size_id;
  if (color_id !== undefined) where.color_id = color_id;
  if (fitting_id !== undefined) where.fitting_id = fitting_id;

  return await Stock.findOne({ where });
};
