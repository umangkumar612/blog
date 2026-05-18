import { SocialPost } from "../models/SocialPost.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const extractHashtags = (content) =>
  [...content.matchAll(/#([\w-]+)/g)].map((match) => match[1].toLowerCase());

const calculateScore = ({ reactionsCount = 0, commentsCount = 0, repostsCount = 0, viewsCount = 0 }) =>
  reactionsCount * 3 + commentsCount * 5 + repostsCount * 7 + Math.log10(viewsCount + 1);

export const createSocialPost = asyncHandler(async (req, res) => {
  const hashtags = req.body.hashtags?.length ? req.body.hashtags : extractHashtags(req.body.content);

  const post = await SocialPost.create({
    ...req.body,
    hashtags,
    author: req.user._id
  });

  res.status(201).json({ success: true, data: post });
});

export const getSocialFeed = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 30);
  const skip = (page - 1) * limit;
  const filter = { isDeleted: false, visibility: "public" };

  if (req.query.hashtag) filter.hashtags = String(req.query.hashtag).toLowerCase();
  if (req.query.community) filter.community = String(req.query.community).toLowerCase();
  if (req.query.q) filter.$text = { $search: req.query.q };

  const [items, total] = await Promise.all([
    SocialPost.find(filter)
      .sort(req.query.sort === "top" ? { score: -1, createdAt: -1 } : { createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name username avatar bio followersCount")
      .lean(),
    SocialPost.countDocuments(filter)
  ]);

  res.json({
    success: true,
    data: {
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

export const getSocialPost = asyncHandler(async (req, res) => {
  const post = await SocialPost.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { $inc: { viewsCount: 1 } },
    { new: true }
  )
    .populate("author", "name username avatar bio followersCount")
    .populate("repostOf")
    .lean();

  if (!post) {
    throw new ApiError(404, "Social post not found");
  }

  res.json({ success: true, data: post });
});

export const reactToSocialPost = asyncHandler(async (req, res) => {
  const post = await SocialPost.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { $inc: { reactionsCount: 1 } },
    { new: true }
  );

  if (!post) {
    throw new ApiError(404, "Social post not found");
  }

  post.score = calculateScore(post);
  await post.save();

  res.json({ success: true, data: { reactionsCount: post.reactionsCount, score: post.score } });
});

export const repostSocialPost = asyncHandler(async (req, res) => {
  const source = await SocialPost.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { $inc: { repostsCount: 1 } },
    { new: true }
  );

  if (!source) {
    throw new ApiError(404, "Social post not found");
  }

  source.score = calculateScore(source);
  await source.save();

  const repost = await SocialPost.create({
    author: req.user._id,
    content: req.body.content || `Reposted from ${source._id}`,
    repostOf: source._id,
    hashtags: source.hashtags,
    visibility: source.visibility
  });

  res.status(201).json({ success: true, data: repost });
});

export const deleteSocialPost = asyncHandler(async (req, res) => {
  const post = await SocialPost.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );

  if (!post) {
    throw new ApiError(404, "Social post not found");
  }

  res.status(204).send();
});

export const getSocialTrends = asyncHandler(async (_req, res) => {
  const trends = await SocialPost.aggregate([
    { $match: { isDeleted: false, visibility: "public" } },
    { $unwind: "$hashtags" },
    { $group: { _id: "$hashtags", postsCount: { $sum: 1 }, score: { $sum: "$score" } } },
    { $sort: { postsCount: -1, score: -1 } },
    { $limit: 12 },
    { $project: { _id: 0, tag: "$_id", postsCount: 1, score: 1 } }
  ]);

  res.json({ success: true, data: trends });
});
