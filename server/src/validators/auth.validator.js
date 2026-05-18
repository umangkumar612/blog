import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().max(80).required(),
  username: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9_]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.pattern.base": "Username can only contain lowercase letters, numbers, and underscores"
    }),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(8).max(72).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required()
});
