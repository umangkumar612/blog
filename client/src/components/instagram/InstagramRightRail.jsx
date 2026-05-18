import React, { useState } from "react";

export function InstagramRightRail({ suggestions }) {
  const [following, setFollowing] = useState([]);

  const toggleFollow = (handle) => {
    setFollowing((current) =>
      current.includes(handle) ? current.filter((item) => item !== handle) : [...current, handle]
    );
  };

  return (
    <aside className="sticky top-8 hidden h-fit w-[320px] xl:block">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-slate-950 to-cyan-500" />
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">umang</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Umang Kataria</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-sky-500">Switch</button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">Suggested for you</p>
        <button className="text-xs font-semibold text-slate-950 dark:text-white">See All</button>
      </div>

      <div className="space-y-4">
        {suggestions.map((item) => (
          <div key={item.handle} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${item.avatar}`} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{item.handle}</p>
                <p className="truncate text-xs text-slate-500">{item.reason}</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-sky-500" onClick={() => toggleFollow(item.handle)}>
              {following.includes(item.handle) ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs leading-5 text-slate-400">
        About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language
      </p>
      <p className="mt-4 text-xs uppercase text-slate-400">© 2026 Blogify from Umang</p>
    </aside>
  );
}
