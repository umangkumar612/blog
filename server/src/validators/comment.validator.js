import Joi from "joi";

export const createCommentSchema = Joi.object({
  content: Joi.string().trim().max(2000).required(),
  parentComment: Joi.string().hex().length(24).allow(null)
});

export const updateCommentSchema = Joi.object({
  content: Joi.string().trim().max(2000).required()
});
