import React, { useState } from "react";
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Repeat2, Share2 } from "lucide-react";

export function SocialPostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [comments, setComments] = useState(post.comments);
  const [shares, setShares] = useState(post.shares);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.06]">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${post.accent}`} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-950 dark:text-white">{post.author}</h3>
                <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-semibold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
                  {post.type}
                </span>
              </div>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                {post.handle} · {post.role} · {post.time}
              </p>
            </div>
          </div>
          <button className="icon-only" onClick={() => setMenuOpen((value) => !value)} aria-label="More post options">
            <MoreHorizontal size={18} />
          </button>
        </div>
        {menuOpen && (
          <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300">
            Post options opened. Report, mute, and copy-link actions can connect here.
          </div>
        )}

        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-200">{post.content}</p>

        <div className={`mt-5 min-h-52 rounded-3xl bg-gradient-to-br ${post.imageGradient} p-5 text-white shadow-inner`}>
          <div className="flex h-full min-h-44 flex-col justify-between rounded-2xl border border-white/20 bg-black/20 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/75">{post.topic}</p>
            <div>
              <p className="max-w-md text-3xl font-semibold leading-tight">Live conversation gaining momentum</p>
              <p className="mt-3 text-sm text-white/80">{post.views} views from your network</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2 border-t border-slate-200 pt-4 text-slate-500 dark:border-white/10 dark:text-slate-400">
          <button
            className={`icon-action justify-center ${liked ? "text-rose-500" : ""}`}
            onClick={() => setLiked((value) => !value)}
            aria-label="React to post"
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            <span>{post.reactions + (liked ? 1 : 0)}</span>
          </button>
          <button
            className="icon-action justify-center"
            onClick={() => setComments((value) => value + 1)}
            aria-label="Comment on post"
          >
            <MessageCircle size={18} />
            <span>{comments}</span>
          </button>
          <button
            className="icon-action justify-center"
            onClick={() => setShares((value) => value + 1)}
            aria-label="Repost"
          >
            <Repeat2 size={18} />
            <span>{shares}</span>
          </button>
          <div className="flex justify-center gap-2">
            <button className="icon-action" aria-label="Share post">
              <Share2 size={18} />
            </button>
            <button
              className={`icon-action ${saved ? "text-amber-500" : ""}`}
              onClick={() => setSaved((value) => !value)}
              aria-label="Save post"
            >
              <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
