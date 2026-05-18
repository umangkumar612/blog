import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    type: {
      type: String,
      enum: ["image", "video", "audio"],
      default: "image"
    },
    alt: String
  },
  { _id: false }
);

const pollOptionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    votesCount: {
      type: Number,
      default: 0
    }
  },
  { _id: true }
);

const socialPostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    media: [mediaSchema],
    hashtags: [
      {
        type: String,
        lowercase: true,
        trim: true,
        index: true
      }
    ],
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
      }
    ],
    community: {
      type: String,
      lowercase: true,
      trim: true,
      index: true
    },
    parentPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialPost",
      default: null,
      index: true
    },
    repostOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialPost",
      default: null,
      index: true
    },
    poll: {
      question: String,
      options: [pollOptionSchema],
      expiresAt: Date
    },
    visibility: {
      type: String,
      enum: ["public", "followers", "community"],
      default: "public",
      index: true
    },
    reactionsCount: {
      type: Number,
      default: 0
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    repostsCount: {
      type: Number,
      default: 0
    },
    savesCount: {
      type: Number,
      default: 0
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      default: 0,
      index: true
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  { timestamps: true }
);

socialPostSchema.index({ content: "text", hashtags: "text", community: "text" });
socialPostSchema.index({ visibility: 1, isDeleted: 1, createdAt: -1 });
socialPostSchema.index({ score: -1, createdAt: -1 });
socialPostSchema.index({ author: 1, createdAt: -1 });

export const SocialPost = mongoose.model("SocialPost", socialPostSchema);
