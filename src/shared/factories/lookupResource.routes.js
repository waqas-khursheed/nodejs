import express from "express";
import Joi from "joi";
import { adminAuthMiddleware } from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../middleware/validateParams.middleware.js";
import { makeLookupResourceModule } from "./lookupResource.factory.js";

const defaultIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const defaultListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
}).unknown(true);

// Builds a router with the full create/list/get/update/delete route set for
// a simple lookup/reference resource (see lookupResource.factory.js).
export const makeLookupResourceRouter = ({
  Model,
  resourceLabel,
  listKey,
  searchField,
  filterFields = [],
  parentChecks = [],
  childBlock,
  include = [],
  createSchema,
  updateSchema,
  idParamSchema = defaultIdParamSchema,
  listQuerySchema = defaultListQuerySchema,
  allowDelete = true,
}) => {
  const { controller } = makeLookupResourceModule({
    Model,
    resourceLabel,
    listKey,
    searchField,
    filterFields,
    parentChecks,
    childBlock,
    include,
  });

  const router = express.Router();

  router.post("/create", adminAuthMiddleware, validate(createSchema), controller.create);

  router.get("/", adminAuthMiddleware, validateQuery(listQuerySchema), controller.list);

  router.get("/:id", adminAuthMiddleware, validateParams(idParamSchema), controller.get);

  router.put(
    "/:id",
    adminAuthMiddleware,
    validateParams(idParamSchema),
    validate(updateSchema),
    controller.update
  );

  if (allowDelete) {
    router.delete("/:id", adminAuthMiddleware, validateParams(idParamSchema), controller.remove);
  }

  return router;
};
