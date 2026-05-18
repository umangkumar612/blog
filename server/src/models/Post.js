import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    alt: String
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
      index: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    excerpt: {
      type: String,
      maxlength: 300,
      default: ""
    },
    content: {
      type: String,
      required: true
    },
    coverImage: imageSchema,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    category: {
      type: String,
      lowercase: true,
      trim: true,
      index: true
    },
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
        index: true
      }
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true
    },
    readTime: {
      type: Number,
      default: 1
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    likesCount: {
      type: Number,
      default: 0
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    bookmarksCount: {
      type: Number,
      default: 0
    },
    publishedAt: {
      type: Date,
      index: true
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String]
    }
  },
  { timestamps: true }
);

postSchema.index({ title: "text", excerpt: "text", content: "text", tags: "text" });
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ author: 1, status: 1, createdAt: -1 });
postSchema.index({ category: 1, status: 1, publishedAt: -1 });

export const Post = mongoose.model("Post", postSchema);
