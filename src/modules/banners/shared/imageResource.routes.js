import express from "express";
import Joi from "joi";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { upload } from "../../../shared/middleware/upload.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import { makeImageResourceModule } from "./imageResource.factory.js";

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.number().valid(0, 1),
});

// Builds a router with the full create/list/get/update/status/delete route
// set for a simple "image + status" resource.
export const makeImageResourceRouter = ({
  Model,
  uploadFolder,
  resourceLabel,
  listKey,
  extraCreateFields = {},
  extraUpdateFields = {},
}) => {
  const { controller } = makeImageResourceModule({ Model, uploadFolder, resourceLabel, listKey });

  const createSchema = Joi.object({
    status: Joi.number().valid(0, 1).required(),
    ...extraCreateFields,
  });

  const updateSchema = Joi.object({
    status: Joi.number().valid(0, 1),
    ...extraUpdateFields,
  }).min(1);

  const router = express.Router();

  router.use((req, res, next) => {
    req.module = uploadFolder;
    next();
  });

  router.post(
    "/create",
    adminAuthMiddleware,
    upload.single("image"),
    validate(createSchema),
    controller.create
  );

  router.get("/", adminAuthMiddleware, validateQuery(listQuerySchema), controller.list);

  router.get("/:id", adminAuthMiddleware, validateParams(idParamSchema), controller.get);

  router.put(
    "/:id",
    adminAuthMiddleware,
    validateParams(idParamSchema),
    upload.single("image"),
    validate(updateSchema),
    controller.update
  );

  router.patch(
    "/:id/status",
    adminAuthMiddleware,
    validateParams(idParamSchema),
    controller.toggleStatus
  );

  router.delete("/:id", adminAuthMiddleware, validateParams(idParamSchema), controller.remove);

  return router;
};
