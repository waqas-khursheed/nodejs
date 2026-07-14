import { Op } from "sequelize";
import Product from "../../../database/models/Product.js";
import Brand from "../../../database/models/Brand.js";
import ProductGallery from "../../../database/models/ProductGallery.js";
import AssignCatToProduct from "../../../database/models/AssignCatToProduct.js";
import ProductCategory from "../../../database/models/ProductCategory.js";

const detailIncludes = [
  { model: Brand, as: "brand" },
  { model: ProductGallery, as: "productGalleries" },
  {
    model: AssignCatToProduct,
    as: "assignCatToProducts",
    include: [{ model: ProductCategory, as: "category" }],
  },
];

export const createProductRepo = async (data, options = {}) => {
  return await Product.create(data, options);
};

export const findProductByTitleRepo = async (title, excludeId = null) => {
  const where = { title };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  return await Product.findOne({ where });
};

export const findProductByIdRepo = async (id, withRelations = false) => {
  return await Product.findByPk(id, {
    include: withRelations ? detailIncludes : [],
  });
};

export const findAllProductsRepo = async ({ where, limit, offset }) => {
  return await Product.findAndCountAll({
    where,
    limit,
    offset,
    distinct: true,
    include: [{ model: Brand, as: "brand" }],
    order: [["id", "DESC"]],
  });
};

export const updateProductRepo = async (id, data) => {
  await Product.update(data, { where: { id } });
  return await findProductByIdRepo(id, true);
};

// Write-only variant (no self re-read) for use inside a transaction — see
// the equivalent note in coupon.repository.js.
export const updateProductFieldsRepo = async (id, data, options = {}) => {
  await Product.update(data, { where: { id }, ...options });
};

export const deleteProductRepo = async (id) => {
  return await Product.destroy({ where: { id } });
};

// ---- Category assignment ----
export const syncProductCategoriesRepo = async (productId, categoryIds, options = {}) => {
  await AssignCatToProduct.destroy({ where: { product_id: productId }, ...options });

  if (categoryIds && categoryIds.length > 0) {
    const rows = categoryIds.map((category_id) => ({
      product_id: productId,
      category_id,
    }));

    await AssignCatToProduct.bulkCreate(rows, options);
  }
};

export const findCategoriesByIdsRepo = async (categoryIds) => {
  return await ProductCategory.findAll({ where: { id: categoryIds } });
};

// ---- Gallery ----
export const addProductGalleryImagesRepo = async (productId, filenames, options = {}) => {
  const rows = filenames.map((image) => ({ product_id: productId, image }));

  return await ProductGallery.bulkCreate(rows, options);
};

export const findGalleryImageByIdRepo = async (galleryId) => {
  return await ProductGallery.findByPk(galleryId);
};

export const deleteGalleryImageRepo = async (galleryId) => {
  return await ProductGallery.destroy({ where: { id: galleryId } });
};
