import { errorResponse } from "../responses/apiResponse.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    const errors = error.details.map((e) => e.message);

    return errorResponse(
      res,
      "Validation Error",
      422,
      errors
    );
  }

  next();
};