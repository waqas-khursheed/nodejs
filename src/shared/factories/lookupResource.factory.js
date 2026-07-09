import { Op } from "sequelize";
import { getPagination, buildPaginationMeta } from "../utils/pagination.js";
import {
  successResponse,
  successDataResponse,
  errorResponse,
} from "../responses/apiResponse.js";

// Builds a full create/list/get/update/delete service+controller pair for a
// simple lookup/reference table (countries, states, cities, geo_*, banks,
// card_categories, card_types, faq_categories, ...). These tables share the
// same shape (id + a few plain fields, optional parent FK, optional status)
// so this avoids re-writing the same CRUD over and over.
export const makeLookupResourceModule = ({
  Model,
  resourceLabel,
  listKey,
  searchField,
  filterFields = [],
  parentChecks = [], // [{ field, findFn, errorCode, errorMsg }]
  childBlock, // { countFn, errorCode, errorMsg }
  include = [],
}) => {
  const runParentChecks = async (data) => {
    for (const { field, findFn, errorCode } of parentChecks) {
      if (data[field] !== undefined && data[field] !== null) {
        const found = await findFn(data[field]);
        if (!found) throw new Error(errorCode);
      }
    }
  };

  const service = {
    create: async (data) => {
      await runParentChecks(data);
      const row = await Model.create(data);
      return include.length ? await Model.findByPk(row.id, { include }) : row;
    },

    list: async (query) => {
      const { page, limit, offset } = getPagination(query);
      const where = {};

      for (const f of filterFields) {
        if (query[f] !== undefined && query[f] !== "") where[f] = query[f];
      }

      if (searchField && query.search) {
        where[searchField] = { [Op.like]: `%${query.search}%` };
      }

      const { count, rows } = await Model.findAndCountAll({
        where,
        limit,
        offset,
        include,
        order: [["id", "DESC"]],
      });

      return { [listKey]: rows, meta: buildPaginationMeta({ count, page, limit }) };
    },

    getById: async (id) => {
      const row = await Model.findByPk(id, { include });
      if (!row) throw new Error("NOT_FOUND");
      return row;
    },

    update: async (id, data) => {
      const row = await Model.findByPk(id);
      if (!row) throw new Error("NOT_FOUND");

      await runParentChecks(data);

      await Model.update(data, { where: { id } });
      return await Model.findByPk(id, { include });
    },

    remove: async (id) => {
      const row = await Model.findByPk(id);
      if (!row) throw new Error("NOT_FOUND");

      if (childBlock) {
        const childCount = await childBlock.countFn(id);
        if (childCount > 0) throw new Error(childBlock.errorCode);
      }

      await Model.destroy({ where: { id } });
      return true;
    },
  };

  const errorMap = { NOT_FOUND: { code: 404, msg: `${resourceLabel} not found` } };
  for (const { errorCode, errorMsg } of parentChecks) {
    errorMap[errorCode] = { code: 422, msg: errorMsg };
  }
  if (childBlock) {
    errorMap[childBlock.errorCode] = { code: 409, msg: childBlock.errorMsg };
  }

  const handleError = (res, err) => {
    const mapped = errorMap[err.message];
    if (mapped) return errorResponse(res, mapped.msg, mapped.code);

    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
      500
    );
  };

  const controller = {
    create: async (req, res) => {
      try {
        const result = await service.create(req.body);
        return successDataResponse(res, `${resourceLabel} created successfully`, result, 201);
      } catch (error) {
        return handleError(res, error);
      }
    },

    list: async (req, res) => {
      try {
        const result = await service.list(req.query);
        return successDataResponse(res, `${resourceLabel}s fetched successfully`, result, 200);
      } catch (error) {
        return handleError(res, error);
      }
    },

    get: async (req, res) => {
      try {
        const result = await service.getById(req.params.id);
        return successDataResponse(res, `${resourceLabel} fetched successfully`, result, 200);
      } catch (error) {
        return handleError(res, error);
      }
    },

    update: async (req, res) => {
      try {
        const result = await service.update(req.params.id, req.body);
        return successDataResponse(res, `${resourceLabel} updated successfully`, result, 200);
      } catch (error) {
        return handleError(res, error);
      }
    },

    remove: async (req, res) => {
      try {
        await service.remove(req.params.id);
        return successResponse(res, `${resourceLabel} deleted successfully`, 200);
      } catch (error) {
        return handleError(res, error);
      }
    },
  };

  return { service, controller };
};
