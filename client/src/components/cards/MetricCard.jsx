import React from "react";
import { Activity } from "lucide-react";

export function MetricCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="glass-panel group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-cyan-600 shadow-sm dark:bg-white/10 dark:text-cyan-300">
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-300">
        <Activity size={16} />
        {item.delta} this month
      </div>
    </div>
  );
}
