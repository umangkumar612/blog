import React from "react";
import {
  Bell,
  Compass,
  Heart,
  Home,
  Menu,
  MessageCircle,
  PlusSquare,
  Search,
  User
} from "lucide-react";

const items = [
  { key: "home", label: "Home", icon: Home },
  { key: "search", label: "Search", icon: Search },
  { key: "explore", label: "Explore", icon: Compass },
  { key: "messages", label: "Messages", icon: MessageCircle },
  { key: "notifications", label: "Notifications", icon: Heart },
  { key: "create", label: "Create", icon: PlusSquare },
  { key: "profile", label: "Profile", icon: User }
];

export function InstagramSidebar({ activePanel, onAction }) {
  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[244px] border-r border-slate-200 bg-white px-4 py-7 dark:border-white/10 dark:bg-black lg:block">
        <button
          className="mb-9 px-3 text-left text-3xl font-semibold tracking-normal text-slate-950 dark:text-white"
          onClick={() => onAction("home")}
        >
          Blogify
        </button>
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = activePanel === item.key || (activePanel === "" && item.key === "home");

            return (
              <button
                key={item.key}
                onClick={() => onAction(item.key)}
                className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left text-base transition hover:bg-slate-100 dark:hover:bg-white/10 ${
                  active ? "font-semibold text-slate-950 dark:text-white" : "text-slate-700 dark:text-slate-200"
                }`}
              >
                <Icon size={25} strokeWidth={active ? 2.7 : 2} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button className="absolute bottom-7 left-4 flex w-[210px] items-center gap-4 rounded-xl px-3 py-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10">
          <Menu size={25} /> More
        </button>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-black lg:hidden">
        <button className="text-2xl font-semibold text-slate-950 dark:text-white" onClick={() => onAction("home")}>
          Blogify
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => onAction("notifications")} aria-label="Notifications">
            <Bell size={24} />
          </button>
          <button onClick={() => onAction("messages")} aria-label="Messages">
            <MessageCircle size={24} />
          </button>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white px-4 py-2 dark:border-white/10 dark:bg-black lg:hidden">
        {items
          .filter((item) => ["home", "search", "create", "messages", "profile"].includes(item.key))
          .map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className="flex h-11 items-center justify-center rounded-xl"
                onClick={() => onAction(item.key)}
                aria-label={item.label}
              >
                <Icon size={25} />
              </button>
            );
          })}
      </nav>
    </>
  );
}
