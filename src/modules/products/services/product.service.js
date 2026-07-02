import { Op } from "sequelize";
import {
  createProductRepo,
  findProductByTitleRepo,
  findProductByIdRepo,
  findAllProductsRepo,
  updateProductRepo,
  deleteProductRepo,
  syncProductCategoriesRepo,
  findCategoriesByIdsRepo,
  addProductGalleryImagesRepo,
  findGalleryImageByIdRepo,
  deleteGalleryImageRepo,
} from "../repositories/product.repository.js";
import { findBrandByIdRepo } from "../../brands/repositories/brand.repository.js";
import { slugify } from "../../../shared/helpers/helpers.js";
import { deleteUploadedFile } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

const validateCategoryIds = async (categoryIds) => {
  if (!categoryIds || categoryIds.length === 0) return;

  const found = await findCategoriesByIdsRepo(categoryIds);

  if (found.length !== categoryIds.length) {
    throw new Error("CATEGORY_NOT_FOUND");
  }
};

export const createProductService = async (data) => {
  const {
    title,
    brand_id,
    category_ids,
    featured_image,
    hovered_image,
    gallery,
    ...rest
  } = data;

  if (!featured_image) {
    throw new Error("FEATURED_IMAGE_REQUIRED");
  }

  const exists = await findProductByTitleRepo(title);
  if (exists) {
    throw new Error("PRODUCT_ALREADY_EXISTS");
  }

  if (brand_id) {
    const brand = await findBrandByIdRepo(brand_id);
    if (!brand) {
      throw new Error("BRAND_NOT_FOUND");
    }
  }

  await validateCategoryIds(category_ids);

  const product = await createProductRepo({
    ...rest,
    title,
    slug: slugify(title),
    brand_id: brand_id || null,
    featured_image,
    hovered_image: hovered_image || null,
  });

  if (category_ids && category_ids.length > 0) {
    await syncProductCategoriesRepo(product.id, category_ids);
  }

  if (gallery && gallery.length > 0) {
    await addProductGalleryImagesRepo(product.id, gallery);
  }

  return await findProductByIdRepo(product.id, true);
};

export const getProductsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.status !== undefined && query.status !== "") {
    where.status = query.status;
  }

  if (query.brand_id) {
    where.brand_id = query.brand_id;
  }

  if (query.search) {
    where.title = { [Op.like]: `%${query.search}%` };
  }

  const { count, rows } = await findAllProductsRepo({ where, limit, offset });

  return {
    products: rows,
    meta: buildPaginationMeta({ count, page, limit }),
  };
};

export const getProductByIdService = async (id) => {
  const product = await findProductByIdRepo(id, true);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return product;
};

export const updateProductService = async (id, data) => {
  const product = await findProductByIdRepo(id);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  const {
    title,
    brand_id,
    category_ids,
    featured_image,
    hovered_image,
    gallery,
    ...rest
  } = data;

  if (title) {
    const exists = await findProductByTitleRepo(title, id);
    if (exists) {
      throw new Error("PRODUCT_ALREADY_EXISTS");
    }
  }

  if (brand_id !== undefined && brand_id !== null) {
    const brand = await findBrandByIdRepo(brand_id);
    if (!brand) {
      throw new Error("BRAND_NOT_FOUND");
    }
  }

  await validateCategoryIds(category_ids);

  const updateData = { ...rest };

  if (title !== undefined) {
    updateData.title = title;
    updateData.slug = slugify(title);
  }
  if (brand_id !== undefined) updateData.brand_id = brand_id;

  if (featured_image) {
    updateData.featured_image = featured_image;
    if (product.featured_image) deleteUploadedFile("products", product.featured_image);
  }
  if (hovered_image) {
    updateData.hovered_image = hovered_image;
    if (product.hovered_image) deleteUploadedFile("products", product.hovered_image);
  }

  await updateProductRepo(id, updateData);

  if (category_ids !== undefined) {
    await syncProductCategoriesRepo(id, category_ids);
  }

  if (gallery && gallery.length > 0) {
    await addProductGalleryImagesRepo(id, gallery);
  }

  return await findProductByIdRepo(id, true);
};

export const toggleProductStatusService = async (id) => {
  const product = await findProductByIdRepo(id);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  const newStatus = product.status === 1 ? 0 : 1;

  return await updateProductRepo(id, { status: newStatus });
};

export const deleteProductService = async (id) => {
  const product = await findProductByIdRepo(id, true);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  await deleteProductRepo(id);

  if (product.featured_image) deleteUploadedFile("products", product.featured_image);
  if (product.hovered_image) deleteUploadedFile("products", product.hovered_image);

  (product.productGalleries || []).forEach((img) =>
    deleteUploadedFile("products", img.image)
  );

  return true;
};

export const deleteProductGalleryImageService = async (galleryId) => {
  const image = await findGalleryImageByIdRepo(galleryId);

  if (!image) {
    throw new Error("GALLERY_IMAGE_NOT_FOUND");
  }

  await deleteGalleryImageRepo(galleryId);
  deleteUploadedFile("products", image.image);

  return true;
};
