import React from "react";
import { Search } from "lucide-react";
import { SocialPostCard } from "../components/cards/SocialPostCard.jsx";
import { Composer } from "../components/social/Composer.jsx";
import { RightRail } from "../components/social/RightRail.jsx";
import { StoriesRail } from "../components/social/StoriesRail.jsx";

export function FeedSection({ posts, query, onCreatePost, onQueryChange }) {
  return (
    <section id="feed" className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-cyan-600 dark:text-cyan-300">Home Feed</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
              What your network is building
            </h2>
          </div>
          <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm dark:border-white/10 dark:bg-white/10">
            <Search size={18} className="text-slate-400" />
            <input
              className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search people, posts, topics"
            />
          </label>
        </div>
        <StoriesRail />
        <Composer onCreatePost={onCreatePost} />
        {posts.map((post) => (
          <SocialPostCard key={`${post.handle}-${post.time}`} post={post} />
        ))}
      </div>
      <RightRail />
    </section>
  );
}
