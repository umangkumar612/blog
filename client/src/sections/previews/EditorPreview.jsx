import React, { useState } from "react";
import { ImagePlus, Rocket } from "lucide-react";

export function EditorPreview() {
  const [title, setTitle] = useState("What should the community build next?");
  const words = title.split(/\s+/).filter(Boolean).length + 640;
  const readTime = Math.max(1, Math.ceil(words / 220));

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 dark:border-white/10">
          {["H1", "B", "I", "Link", "Code", "Quote"].map((tool) => (
            <button key={tool} className="toolbar-button">
              {tool}
            </button>
          ))}
          <button className="toolbar-icon" aria-label="Add image">
            <ImagePlus size={18} />
          </button>
        </div>
        <input
          className="mt-6 w-full bg-transparent text-3xl font-semibold leading-tight text-slate-950 outline-none dark:text-white"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className="mt-5 min-h-[300px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-8 text-slate-700 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-200"
          defaultValue={
            "Community posts support rich media, polls, mentions, hashtags, reposts, and moderation queues.\n\n## Why it works\n\nA social platform needs fast creation, trust controls, discovery signals, and structured engagement data that maps cleanly into MongoDB documents."
          }
        />
      </div>

      <aside className="space-y-5">
        <div className="glass-panel rounded-3xl p-5">
          <h3 className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
            <Rocket size={18} /> Community setup
          </h3>
          <div className="mt-4 space-y-3">
            {["Rules configured", "Channels created", "Moderators invited", "Welcome post"].map((item, index) => (
              <div key={item} className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">{item}</span>
                <span className={index < 3 ? "text-emerald-500" : "text-amber-500"}>
                  {index < 3 ? "Ready" : "Optional"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06]">
          <p className="text-sm text-slate-500 dark:text-slate-400">Estimated discussion depth</p>
          <p className="mt-2 text-4xl font-semibold text-slate-950 dark:text-white">{readTime * 14} replies</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["react", "community", "launch", "feedback"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cyan-50 px-3 py-1 text-sm text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
