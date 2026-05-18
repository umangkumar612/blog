import React from "react";
import { Plus } from "lucide-react";
import { stories } from "../../data/content.js";

export function StoriesRail() {
  return (
    <section className="flex gap-3 overflow-x-auto pb-2">
      <button className="flex min-w-28 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-4 text-sm font-semibold text-slate-600 dark:border-white/20 dark:bg-white/[0.06] dark:text-slate-200">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          <Plus size={20} />
        </span>
        Create story
      </button>
      {stories.map((story) => (
        <div
          key={story.name}
          className="min-w-28 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.06]"
        >
          <div className={`h-20 rounded-2xl bg-gradient-to-br ${story.color}`} />
          <p className="mt-3 font-semibold text-slate-950 dark:text-white">{story.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{story.label}</p>
        </div>
      ))}
    </section>
  );
}
