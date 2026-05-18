import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    next(
      new ApiError(
        400,
        "Validation failed",
        error.details.map((detail) => detail.message)
      )
    );
    return;
  }

  req.body = value;
  next();
};
