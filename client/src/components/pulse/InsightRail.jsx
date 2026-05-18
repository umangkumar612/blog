import React, { useState } from "react";

export function InsightRail({ people, communities, onToggleFollow }) {
  const [joined, setJoined] = useState([]);

  return (
    <aside className="hidden space-y-5 xl:block">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06]">
        <p className="text-sm font-semibold uppercase text-slate-500">Your network</p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div><p className="text-2xl font-semibold">1.2k</p><p className="text-xs text-slate-500">followers</p></div>
          <div><p className="text-2xl font-semibold">386</p><p className="text-xs text-slate-500">following</p></div>
          <div><p className="text-2xl font-semibold">42</p><p className="text-xs text-slate-500">posts</p></div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06]">
        <p className="font-semibold text-slate-950 dark:text-white">Suggested people</p>
        <div className="mt-4 space-y-4">
          {people.map((person) => (
            <div key={person.handle} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${person.accent}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{person.name}</p>
                  <p className="truncate text-xs text-slate-500">@{person.handle}</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-cyan-600" onClick={() => onToggleFollow(person.handle)}>
                {person.following ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06]">
        <p className="font-semibold text-slate-950 dark:text-white">Communities</p>
        <div className="mt-4 space-y-3">
          {communities.map((community) => (
            <div key={community.name} className="rounded-2xl bg-slate-50 p-3 dark:bg-white/10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{community.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{community.active}</p>
                </div>
                <button
                  className="text-xs font-semibold text-cyan-600"
                  onClick={() =>
                    setJoined((current) =>
                      current.includes(community.name)
                        ? current.filter((item) => item !== community.name)
                        : [...current, community.name]
                    )
                  }
                >
                  {joined.includes(community.name) ? "Joined" : "Join"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
