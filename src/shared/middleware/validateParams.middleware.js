import { errorResponse } from "../responses/apiResponse.js";

export const validateParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((e) => e.message);

    return errorResponse(res, "Validation Error", 422, errors);
  }

  next();
};

export const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((e) => e.message);

    return errorResponse(res, "Validation Error", 422, errors);
  }

  // Express 5 makes req.query a getter-only property, so mutate in place
  // instead of reassigning.
  Object.assign(req.query, value);
  next();
};
