import Joi from "joi";

export const updateAdminProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150),
  email: Joi.string().trim().email(),
}).min(1);

export const changeAdminPasswordSchema = Joi.object({
  old_password: Joi.string().required().messages({
    "string.empty": "Current password is required",
    "any.required": "Current password is required",
  }),
  new_password: Joi.string().min(6).required().messages({
    "string.min": "New password must be at least 6 characters",
    "any.required": "New password is required",
  }),
});
