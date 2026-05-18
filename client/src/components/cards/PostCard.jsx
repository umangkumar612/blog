import React, { useState } from "react";
import { Bookmark, ChevronRight, Heart, MessageCircle, Share2 } from "lucide-react";

export function PostCard({ post, index }) {
  const [liked, setLiked] = useState(index === 0);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.06]">
      <div className={`h-2 bg-gradient-to-r ${post.color}`} />
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 dark:bg-white/10 dark:text-slate-200">
            {post.category}
          </span>
          <span>{post.readTime}</span>
          <span>{post.views} views</span>
        </div>
        <h3 className="mt-4 text-xl font-semibold leading-tight text-slate-950 dark:text-white">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${post.color}`} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{post.author}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{post.role}</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-1 rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-slate-950">
            Read <ChevronRight size={14} />
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-slate-500 dark:border-white/10 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <button
              className={`icon-action ${liked ? "text-rose-500" : ""}`}
              onClick={() => setLiked((value) => !value)}
              aria-label="Like post"
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="icon-action" aria-label="View comments">
              <MessageCircle size={18} />
              <span>{post.comments}</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="icon-only" aria-label="Share post">
              <Share2 size={18} />
            </button>
            <button
              className={`icon-only ${bookmarked ? "text-amber-500" : ""}`}
              onClick={() => setBookmarked((value) => !value)}
              aria-label="Bookmark post"
            >
              <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
