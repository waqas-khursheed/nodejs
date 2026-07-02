import { deleteUploadedFile } from "../../../shared/utils/fileUtils.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import {
  successResponse,
  successDataResponse,
  errorResponse,
} from "../../../shared/responses/apiResponse.js";

// Builds a full create/list/get/update/toggle-status/delete service+controller
// pair for a simple "image + status" Sequelize model (home banners, side
// banners, application slides, mobile sliders, etc). These tables are
// structurally identical, so this avoids re-writing the same CRUD 5 times.
export const makeImageResourceModule = ({ Model, uploadFolder, resourceLabel, listKey }) => {
  const service = {
    create: async (data) => {
      if (!data.image) throw new Error("IMAGE_REQUIRED");
      return await Model.create(data);
    },

    list: async (query) => {
      const { page, limit, offset } = getPagination(query);
      const where = {};

      if (query.status !== undefined && query.status !== "") {
        where.status = query.status;
      }

      const { count, rows } = await Model.findAndCountAll({
        where,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      return { [listKey]: rows, meta: buildPaginationMeta({ count, page, limit }) };
    },

    getById: async (id) => {
      const row = await Model.findByPk(id);
      if (!row) throw new Error("NOT_FOUND");
      return row;
    },

    update: async (id, data) => {
      const row = await Model.findByPk(id);
      if (!row) throw new Error("NOT_FOUND");

      if (data.image) {
        deleteUploadedFile(uploadFolder, row.image);
      }

      await Model.update(data, { where: { id } });
      return await Model.findByPk(id);
    },

    toggleStatus: async (id) => {
      const row = await Model.findByPk(id);
      if (!row) throw new Error("NOT_FOUND");

      const newStatus = Number(row.status) === 1 ? 0 : 1;
      await Model.update({ status: newStatus }, { where: { id } });
      return await Model.findByPk(id);
    },

    remove: async (id) => {
      const row = await Model.findByPk(id);
      if (!row) throw new Error("NOT_FOUND");

      await Model.destroy({ where: { id } });
      if (row.image) deleteUploadedFile(uploadFolder, row.image);
      return true;
    },
  };

  const handleError = (res, err) => {
    if (err.message === "NOT_FOUND") {
      return errorResponse(res, `${resourceLabel} not found`, 404);
    }
    if (err.message === "IMAGE_REQUIRED") {
      return errorResponse(res, "Image is required", 422);
    }
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
      500
    );
  };

  const controller = {
    create: async (req, res) => {
      try {
        const image = req.file ? req.file.filename : "";
        const result = await service.create({ ...req.body, image });
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
        const image = req.file ? req.file.filename : undefined;
        const data = { ...req.body };
        if (image) data.image = image;

        const result = await service.update(req.params.id, data);
        return successDataResponse(res, `${resourceLabel} updated successfully`, result, 200);
      } catch (error) {
        return handleError(res, error);
      }
    },

    toggleStatus: async (req, res) => {
      try {
        const result = await service.toggleStatus(req.params.id);
        return successDataResponse(res, `${resourceLabel} status updated successfully`, result, 200);
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
