import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().trim().max(180).required(),
  excerpt: Joi.string().trim().max(300).allow(""),
  content: Joi.string().required(),
  category: Joi.string().trim().lowercase().allow(""),
  tags: Joi.array().items(Joi.string().trim().lowercase()).max(8).default([]),
  status: Joi.string().valid("draft", "published").default("draft"),
  coverImage: Joi.object({
    url: Joi.string().uri().required(),
    publicId: Joi.string().required(),
    alt: Joi.string().allow("")
  }).optional(),
  seo: Joi.object({
    metaTitle: Joi.string().allow(""),
    metaDescription: Joi.string().allow(""),
    keywords: Joi.array().items(Joi.string())
  }).optional()
});

export const updatePostSchema = createPostSchema.fork(["title", "content"], (schema) =>
  schema.optional()
);
