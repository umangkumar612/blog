import React from "react";
import { Bell, Filter, LineChart } from "lucide-react";
import { MetricCard } from "../../components/cards/MetricCard.jsx";
import { activity, analytics } from "../../data/content.js";

export function DashboardPreview() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {analytics.map((item) => (
            <MetricCard key={item.label} item={item} />
          ))}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
              <LineChart size={18} /> Message activity
            </h3>
            <button className="icon-only" aria-label="Filter dashboard">
              <Filter size={18} />
            </button>
          </div>
          <div className="mt-6 flex h-56 items-end gap-3">
            {[48, 72, 58, 90, 64, 82, 96, 76, 88, 68, 92, 100].map((height, index) => (
              <div key={index} className="flex flex-1 items-end rounded-t-2xl bg-slate-100 dark:bg-white/10">
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-500 via-emerald-400 to-amber-300"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06]">
          <h3 className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
            <Bell size={18} /> Notifications
          </h3>
          <div className="mt-4 space-y-3">
            {activity.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 dark:bg-white/10 dark:text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.06]">
          <h3 className="font-semibold text-slate-950 dark:text-white">Social inbox</h3>
          <div className="mt-4 space-y-3 text-sm">
            {["Unread DMs", "Mentions", "Room invites", "Moderation queue"].map((item, index) => (
              <div key={item} className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-300">{item}</span>
                <span className="font-semibold text-slate-950 dark:text-white">
                  {[24, 7, 3, 2][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
