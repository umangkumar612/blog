import React, { useState } from "react";
import { Plus } from "lucide-react";

export function StoriesTray({ stories }) {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <section className="rounded-none border-b border-slate-200 bg-white px-1 py-4 dark:border-white/10 dark:bg-black sm:rounded-2xl sm:border sm:px-4">
      <div className="flex gap-4 overflow-x-auto">
        {stories.map((story, index) => (
          <button
            key={story.handle}
            className="w-20 shrink-0 text-center"
            onClick={() => setActiveStory(story)}
          >
            <span className={`mx-auto flex h-17 w-17 items-center justify-center rounded-full bg-gradient-to-tr ${story.color} p-[3px]`}>
              <span className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-white bg-slate-950 text-xs font-semibold text-white dark:border-black">
                {index === 0 ? <Plus size={20} /> : story.name.slice(0, 2).toUpperCase()}
              </span>
            </span>
            <span className="mt-2 block truncate text-xs text-slate-700 dark:text-slate-200">{story.name}</span>
            {story.live && (
              <span className="-mt-1 inline-block rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                LIVE
              </span>
            )}
          </button>
        ))}
      </div>
      {activeStory && (
        <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 dark:bg-white/10 dark:text-slate-200">
          Viewing {activeStory.handle}'s story preview.
        </div>
      )}
    </section>
  );
}
