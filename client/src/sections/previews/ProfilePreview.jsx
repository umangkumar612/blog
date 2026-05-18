import React from "react";
import { UserPlus } from "lucide-react";

export function ProfilePreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
      <div className="h-40 bg-[linear-gradient(120deg,#06b6d4,#f43f5e,#f59e0b)]" />
      <div className="p-6">
        <div className="-mt-16 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="h-28 w-28 rounded-3xl border-4 border-white bg-gradient-to-br from-slate-950 to-cyan-500 shadow-xl dark:border-slate-950" />
            <div className="pb-2">
              <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">Aisha Morgan</h3>
              <p className="text-slate-500 dark:text-slate-400">@aisha connects builders and creators</p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-slate-950">
            <UserPlus size={18} /> Follow
          </button>
        </div>
        <p className="mt-6 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          Product-minded creator hosting discussions about scalable social systems, UI architecture,
          creator tools, community design, and network effects.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["46.9k", "Followers"],
            ["128", "Posts"],
            ["42", "Communities"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-4 dark:bg-white/10">
              <p className="text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
