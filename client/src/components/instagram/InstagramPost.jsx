import React, { useState } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Smile
} from "lucide-react";

export function InstagramPost({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const toggleLike = () => {
    setLiked((value) => !value);
    setLikes((value) => value + (liked ? -1 : 1));
  };

  const addComment = () => {
    const text = comment.trim();
    if (!text) return;
    setComments((current) => [{ user: "umang", text }, ...current]);
    setComment("");
  };

  return (
    <article className="border-b border-slate-200 bg-white pb-5 dark:border-white/10 dark:bg-black sm:rounded-2xl sm:border sm:px-0 sm:shadow-sm">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${post.avatar} p-[2px]`}>
            <div className="h-full w-full rounded-full border-2 border-white bg-slate-900 dark:border-black" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{post.handle}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">{post.location}</p>
          </div>
        </div>
        <button className="rounded-full p-2 transition hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Post options">
          <MoreHorizontal size={22} />
        </button>
      </header>

      <button
        className={`block aspect-square w-full bg-gradient-to-br ${post.media} sm:aspect-[4/5]`}
        onDoubleClick={toggleLike}
        aria-label="Double click to like"
      >
        <div className="flex h-full items-end p-5">
          <div className="w-full rounded-3xl border border-white/20 bg-black/20 p-5 text-left text-white backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/75">Blogify reel</p>
            <p className="mt-2 max-w-sm text-3xl font-semibold leading-tight">{post.caption.split(".")[0]}.</p>
          </div>
        </div>
      </button>

      <div className="px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <button onClick={toggleLike} aria-label="Like post">
              <Heart size={26} className={liked ? "text-rose-500" : ""} fill={liked ? "currentColor" : "none"} />
            </button>
            <button onClick={() => setShowAllComments((value) => !value)} aria-label="View comments">
              <MessageCircle size={26} />
            </button>
            <button aria-label="Share post">
              <Send size={26} />
            </button>
          </div>
          <button onClick={() => setSaved((value) => !value)} aria-label="Save post">
            <Bookmark size={26} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>

        <p className="text-sm font-semibold text-slate-950 dark:text-white">
          {likes.toLocaleString()} likes
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">
          <span className="font-semibold">{post.handle}</span> {post.caption}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <button key={tag} className="text-sm font-medium text-sky-700 dark:text-sky-300">
              {tag}
            </button>
          ))}
        </div>
        <button
          className="mt-2 text-sm text-slate-500 dark:text-slate-400"
          onClick={() => setShowAllComments((value) => !value)}
        >
          {showAllComments ? "Hide comments" : `View all ${comments.length} comments`}
        </button>
        {showAllComments && (
          <div className="mt-2 space-y-2">
            {comments.map((item, index) => (
              <p key={`${item.user}-${index}`} className="text-sm text-slate-700 dark:text-slate-200">
                <span className="font-semibold">{item.user}</span> {item.text}
              </p>
            ))}
          </div>
        )}
        <p className="mt-2 text-xs uppercase text-slate-400">{post.time}</p>

        <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3 dark:border-white/10">
          <Smile size={22} className="text-slate-500" />
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") addComment();
            }}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Add a comment..."
          />
          <button
            className="text-sm font-semibold text-sky-500 disabled:text-sky-200"
            disabled={!comment.trim()}
            onClick={addComment}
          >
            Post
          </button>
        </div>
      </div>
    </article>
  );
}
