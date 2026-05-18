import React from "react";
import { Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>Blogify Social is designed for feeds, follows, media posts, live rooms, notifications, messaging, moderation, and PWA delivery.</p>
          <button className="inline-flex items-center gap-2 font-semibold text-cyan-600 dark:text-cyan-300">
            Deployment checklist <Send size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
