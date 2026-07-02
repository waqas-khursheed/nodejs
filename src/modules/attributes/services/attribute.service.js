import { Op } from "sequelize";
import {
  createAttributeRepo,
  findAttributeByTitleRepo,
  findAttributeByIdRepo,
  findAllAttributesRepo,
  updateAttributeRepo,
  deleteAttributeRepo,
  countAttributeItemsRepo,
} from "../repositories/attribute.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const createAttributeService = async ({ attribute_title }) => {
  const exists = await findAttributeByTitleRepo(attribute_title);

  if (exists) {
    throw new Error("ATTRIBUTE_ALREADY_EXISTS");
  }

  return await createAttributeRepo({ attribute_title });
};

export const getAttributesService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.search) {
    where.attribute_title = { [Op.like]: `%${query.search}%` };
  }

  const { count, rows } = await findAllAttributesRepo({ where, limit, offset });

  return {
    attributes: rows,
    meta: buildPaginationMeta({ count, page, limit }),
  };
};

export const getAttributeByIdService = async (id) => {
  const attribute = await findAttributeByIdRepo(id, true);

  if (!attribute) {
    throw new Error("ATTRIBUTE_NOT_FOUND");
  }

  return attribute;
};

export const updateAttributeService = async (id, { attribute_title }) => {
  const attribute = await findAttributeByIdRepo(id);

  if (!attribute) {
    throw new Error("ATTRIBUTE_NOT_FOUND");
  }

  if (attribute_title) {
    const exists = await findAttributeByTitleRepo(attribute_title, id);

    if (exists) {
      throw new Error("ATTRIBUTE_ALREADY_EXISTS");
    }
  }

  return await updateAttributeRepo(id, { attribute_title });
};

export const deleteAttributeService = async (id) => {
  const attribute = await findAttributeByIdRepo(id);

  if (!attribute) {
    throw new Error("ATTRIBUTE_NOT_FOUND");
  }

  const itemCount = await countAttributeItemsRepo(id);

  if (itemCount > 0) {
    throw new Error("ATTRIBUTE_HAS_ITEMS");
  }

  await deleteAttributeRepo(id);

  return true;
};
