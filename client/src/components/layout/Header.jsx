import React from "react";
import { Moon, PenLine, Sparkles, Sun } from "lucide-react";
import { navItems } from "../../data/content.js";

export function Header({ activeView, dark, onNavigate, onToggleTheme }) {
  const handlePostClick = () => {
    onNavigate("Feed");
    document.getElementById("feed")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-cyan-500/20 dark:bg-white dark:text-slate-950">
            <Sparkles size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Blogify Social</h1>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              Network for builders
            </p>
          </div>
        </div>

        <nav className="hidden items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/10 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeView === item
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="icon-only" onClick={onToggleTheme} aria-label="Toggle color mode">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="hidden items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-slate-950 sm:inline-flex"
            onClick={handlePostClick}
          >
            <PenLine size={18} /> Post
          </button>
        </div>
      </div>
    </header>
  );
}
