import React from "react";

export function ProfilePage({ posts }) {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.06]">
        <div className="h-44 bg-gradient-to-r from-slate-950 via-cyan-600 to-fuchsia-500" />
        <div className="p-6">
          <div className="-mt-20 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="h-28 w-28 rounded-3xl border-4 border-white bg-gradient-to-br from-slate-950 to-cyan-500 dark:border-slate-950" />
              <div className="pb-2">
                <h1 className="text-3xl font-semibold">Umang Kataria</h1>
                <p className="text-slate-500">@umang</p>
              </div>
            </div>
            <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
              Edit profile
            </button>
          </div>
          <p className="mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
            Building a social media platform with creator feeds, following posts, communities, messaging, and analytics.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              [posts.length, "Posts"],
              ["1.2k", "Followers"],
              ["386", "Following"],
              ["42k", "Reach"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/10">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className={`min-h-48 rounded-3xl bg-gradient-to-br ${post.media} p-4 text-white`}>
            <p className="text-sm font-semibold">@{post.handle}</p>
            <p className="mt-20 text-lg font-semibold">{post.format}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
