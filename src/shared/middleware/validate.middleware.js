import { errorResponse } from "../responses/apiResponse.js";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
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

  // apply Joi defaults/coercions back onto req.body
  req.body = value;

  next();
};