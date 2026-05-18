import React, { useState } from "react";
import { Bookmark, Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";

export function PulsePostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reactions, setReactions] = useState(post.reactions);
  const [replies, setReplies] = useState(post.replies);

  const toggleLike = () => {
    setLiked((value) => !value);
    setReactions((value) => value + (liked ? -1 : 1));
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${post.accent}`} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-slate-950 dark:text-white">{post.author}</p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                  {post.format}
                </span>
              </div>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                @{post.handle} · {post.group} · {post.time}
              </p>
            </div>
          </div>
          {post.following && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
              Following
            </span>
          )}
        </div>

        <p className="mt-5 text-lg leading-8 text-slate-800 dark:text-slate-100">{post.body}</p>

        <div className={`mt-5 rounded-3xl bg-gradient-to-br ${post.media} p-5 text-white`}>
          <div className="min-h-52 rounded-2xl border border-white/20 bg-black/20 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase text-white/75">Reach {post.reach}</p>
            <p className="mt-12 max-w-md text-3xl font-semibold leading-tight">
              {post.tags.map((tag) => `#${tag}`).join(" ")}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <button key={tag} className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
              #{tag}
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-5 gap-2 border-t border-slate-200 pt-4 text-slate-500 dark:border-white/10 dark:text-slate-400">
          <button className={`icon-action justify-center ${liked ? "text-rose-500" : ""}`} onClick={toggleLike}>
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            <span>{reactions}</span>
          </button>
          <button className="icon-action justify-center" onClick={() => setReplies((value) => value + 1)}>
            <MessageCircle size={18} />
            <span>{replies}</span>
          </button>
          <button className="icon-action justify-center">
            <Repeat2 size={18} />
            <span>{post.reposts}</span>
          </button>
          <button className="icon-action justify-center">
            <Share2 size={18} />
          </button>
          <button className={`icon-action justify-center ${saved ? "text-amber-500" : ""}`} onClick={() => setSaved((value) => !value)}>
            <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
