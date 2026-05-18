import React, { useState } from "react";

export function NotificationsPage({ notifications }) {
  const [read, setRead] = useState([]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-cyan-600 dark:text-cyan-300">Alerts</p>
          <h1 className="mt-2 text-3xl font-semibold">Notifications</h1>
        </div>
        <button className="text-sm font-semibold text-cyan-600" onClick={() => setRead(notifications.map((item) => `${item.user}-${item.time}`))}>
          Mark all read
        </button>
      </div>
      <div className="space-y-3">
        {notifications.map((item) => {
          const id = `${item.user}-${item.time}`;
          const isRead = read.includes(id);
          return (
            <button
              key={id}
              className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left ${
                isRead
                  ? "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]"
                  : "border-cyan-200 bg-cyan-50 dark:border-cyan-400/20 dark:bg-cyan-400/10"
              }`}
              onClick={() => setRead((current) => [...new Set([...current, id])])}
            >
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.avatar}`} />
              <p className="min-w-0 flex-1 text-sm">
                <span className="font-semibold">{item.user}</span> {item.action}
                <span className="ml-2 text-slate-400">{item.time}</span>
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
