import React from "react";
import { Search } from "lucide-react";

export function ExplorePage({ posts, query, onQueryChange }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase text-cyan-600 dark:text-cyan-300">Explore</p>
        <h1 className="mt-2 text-3xl font-semibold">Search posts, people, and topics</h1>
      </div>
      <label className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 dark:border-white/10 dark:bg-white/[0.06]">
        <Search size={20} className="text-slate-400" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent outline-none"
          placeholder="Try feed, mongodb, ui, ai..."
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <article key={post.id} className={`min-h-48 rounded-3xl bg-gradient-to-br ${post.media} p-4 text-white ${index % 4 === 0 ? "sm:col-span-2" : ""}`}>
            <p className="text-xs font-semibold uppercase text-white/70">@{post.handle}</p>
            <p className="mt-16 text-xl font-semibold leading-tight">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
