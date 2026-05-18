import React, { useState } from "react";
import { Hash, Radio, UserPlus } from "lucide-react";
import { creators, trends } from "../../data/content.js";

export function RightRail() {
  const [followedCreators, setFollowedCreators] = useState([]);
  const [selectedTrend, setSelectedTrend] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);

  const toggleFollow = (handle) => {
    setFollowedCreators((current) =>
      current.includes(handle) ? current.filter((item) => item !== handle) : [...current, handle]
    );
  };

  return (
    <aside className="space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
        <h3 className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
          <Hash size={18} /> Trending now
        </h3>
        <div className="mt-4 space-y-3">
          {trends.map((trend) => (
            <button
              key={trend.tag}
              onClick={() => setSelectedTrend(trend.tag)}
              className="block w-full rounded-2xl bg-slate-50 p-3 text-left transition hover:bg-cyan-50 dark:bg-white/10 dark:hover:bg-cyan-400/10"
            >
              <p className="font-semibold text-slate-950 dark:text-white">{trend.tag}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{trend.posts}</p>
            </button>
          ))}
        </div>
        {selectedTrend && (
          <p className="mt-4 rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
            Showing activity for {selectedTrend}
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
        <h3 className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
          <UserPlus size={18} /> Suggested creators
        </h3>
        <div className="mt-4 space-y-4">
          {creators.slice(0, 3).map((creator, index) => (
            <div key={creator.handle} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${
                  ["from-cyan-500 to-emerald-400", "from-fuchsia-500 to-rose-400", "from-amber-400 to-orange-500"][index]
                }`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{creator.name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{creator.handle}</p>
                </div>
              </div>
              <button
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  followedCreators.includes(creator.handle)
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200"
                    : "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                }`}
                onClick={() => toggleFollow(creator.handle)}
              >
                {followedCreators.includes(creator.handle) ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        id="live-room"
        className="rounded-3xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm dark:border-cyan-400/20 dark:bg-cyan-400/10"
      >
        <h3 className="flex items-center gap-2 font-semibold text-cyan-800 dark:text-cyan-100">
          <Radio size={18} /> Live room
        </h3>
        <p className="mt-3 text-sm leading-6 text-cyan-700 dark:text-cyan-200">
          248 builders are discussing feed ranking, creator monetization, and community moderation.
        </p>
        <button
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold text-white ${
            joinedRoom ? "bg-emerald-600" : "bg-cyan-600"
          }`}
          onClick={() => setJoinedRoom((value) => !value)}
        >
          {joinedRoom ? "Joined room" : "Join room"}
        </button>
      </div>
    </aside>
  );
}
