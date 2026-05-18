import React from "react";
import {
  Bell,
  Compass,
  Home,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  User,
  Users
} from "lucide-react";

const navItems = [
  { key: "home", label: "Home", icon: Home },
  { key: "following", label: "Following", icon: Users },
  { key: "explore", label: "Explore", icon: Compass },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "notifications", label: "Alerts", icon: Bell },
  { key: "profile", label: "Profile", icon: User }
];

export function PulseNav({ activePage, onNavigate, onCreate }) {
  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-slate-200 bg-white/95 px-5 py-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 lg:block">
        <button className="mb-8 flex items-center gap-3" onClick={() => onNavigate("home")}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <Sparkles size={22} />
          </span>
          <span>
            <span className="block text-xl font-semibold text-slate-950 dark:text-white">PulseSpace</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Social network OS</span>
          </span>
        </button>

        <button
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-slate-950"
          onClick={onCreate}
        >
          <Plus size={18} /> Create post
        </button>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active
                    ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-5 right-5 rounded-3xl bg-slate-100 p-4 dark:bg-white/10">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">Creator mode</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Your follower feed, posts, alerts, and conversations are separated into real sections.
          </p>
        </div>
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 lg:hidden">
        <button className="flex items-center gap-2 font-semibold" onClick={() => onNavigate("home")}>
          <Sparkles size={22} /> PulseSpace
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("explore")} aria-label="Search">
            <Search size={22} />
          </button>
          <button onClick={onCreate} aria-label="Create post">
            <Plus size={24} />
          </button>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-slate-950 lg:hidden">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = activePage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex h-11 items-center justify-center rounded-2xl ${active ? "text-cyan-600" : ""}`}
              aria-label={item.label}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </nav>
    </>
  );
}
