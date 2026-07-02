import { Op } from "sequelize";
import {
  createBrandRepo,
  findBrandByTitleRepo,
  findBrandByIdRepo,
  findAllBrandsRepo,
  updateBrandRepo,
  deleteBrandRepo,
} from "../repositories/brand.repository.js";
import { slugify } from "../../../shared/helpers/helpers.js";
import { deleteUploadedFile } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const createBrandService = async (data) => {
  const { title, description, status, logo, banner } = data;

  const exists = await findBrandByTitleRepo(title);

  if (exists) {
    throw new Error("BRAND_ALREADY_EXISTS");
  }

  if (!logo) throw new Error("LOGO_REQUIRED");
  if (!banner) throw new Error("BANNER_REQUIRED");

  const brandData = {
    title,
    slug: slugify(title),
    description,
    status,
    logo,
    banner,
  };

  return await createBrandRepo(brandData);
};

export const getBrandsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.status !== undefined && query.status !== "") {
    where.status = query.status;
  }

  if (query.search) {
    where.title = { [Op.like]: `%${query.search}%` };
  }

  const { count, rows } = await findAllBrandsRepo({ where, limit, offset });

  return {
    brands: rows,
    meta: buildPaginationMeta({ count, page, limit }),
  };
};

export const getBrandByIdService = async (id) => {
  const brand = await findBrandByIdRepo(id);

  if (!brand) {
    throw new Error("BRAND_NOT_FOUND");
  }

  return brand;
};

export const updateBrandService = async (id, data) => {
  const brand = await findBrandByIdRepo(id);

  if (!brand) {
    throw new Error("BRAND_NOT_FOUND");
  }

  const { title, description, status, logo, banner } = data;

  if (title) {
    const exists = await findBrandByTitleRepo(title, id);

    if (exists) {
      throw new Error("BRAND_ALREADY_EXISTS");
    }
  }

  const updateData = {};

  if (title !== undefined) {
    updateData.title = title;
    updateData.slug = slugify(title);
  }
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;

  if (logo) {
    updateData.logo = logo;
    if (brand.logo) deleteUploadedFile("brands", brand.logo);
  }
  if (banner) {
    updateData.banner = banner;
    if (brand.banner) deleteUploadedFile("brands", brand.banner);
  }

  return await updateBrandRepo(id, updateData);
};

export const toggleBrandStatusService = async (id) => {
  const brand = await findBrandByIdRepo(id);

  if (!brand) {
    throw new Error("BRAND_NOT_FOUND");
  }

  const newStatus = brand.status === 1 ? 0 : 1;

  return await updateBrandRepo(id, { status: newStatus });
};

export const deleteBrandService = async (id) => {
  const brand = await findBrandByIdRepo(id);

  if (!brand) {
    throw new Error("BRAND_NOT_FOUND");
  }

  await deleteBrandRepo(id);

  if (brand.logo) deleteUploadedFile("brands", brand.logo);
  if (brand.banner) deleteUploadedFile("brands", brand.banner);

  return true;
};
