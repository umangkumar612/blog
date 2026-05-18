import React from "react";
import { PulsePostCard } from "../components/pulse/PulsePostCard.jsx";

export function FollowingPage({ posts, people, onToggleFollow }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase text-cyan-600 dark:text-cyan-300">Following</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Posts from people you follow</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {people.map((person) => (
          <div key={person.handle} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${person.accent}`} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{person.name}</p>
                <p className="truncate text-sm text-slate-500">@{person.handle}</p>
              </div>
              <button className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-950" onClick={() => onToggleFollow(person.handle)}>
                {person.following ? "Following" : "Follow"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length ? (
        posts.map((post) => <PulsePostCard key={post.id} post={post} />)
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-white/20">
          Follow creators to fill this feed.
        </div>
      )}
    </div>
  );
}
