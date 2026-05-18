import React from "react";
import { MessageCircle, Radio, Search, Users } from "lucide-react";
import { navItems } from "../data/content.js";
import { AuthPreview } from "./previews/AuthPreview.jsx";
import { DashboardPreview } from "./previews/DashboardPreview.jsx";
import { EditorPreview } from "./previews/EditorPreview.jsx";
import { ProfilePreview } from "./previews/ProfilePreview.jsx";

const viewIcons = {
  Feed: Search,
  Communities: Radio,
  Messages: MessageCircle,
  Profile: Users
};

export function ShowcaseSection({ activeView, onNavigate }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap gap-2">
        {navItems.map((item) => {
          const Icon = viewIcons[item];

          return (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                activeView === item
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300"
              }`}
            >
              <Icon size={18} />
              {item}
            </button>
          );
        })}
      </div>
      {activeView === "Feed" && <AuthPreview />}
      {activeView === "Communities" && <EditorPreview />}
      {activeView === "Messages" && <DashboardPreview />}
      {activeView === "Profile" && <ProfilePreview />}
    </section>
  );
}
