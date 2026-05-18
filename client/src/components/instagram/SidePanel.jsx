import React from "react";
import { X } from "lucide-react";

export function SidePanel({ title, open, onClose, children }) {
  if (!open) return null;

  return (
    <>
      <button className="fixed inset-0 z-40 bg-black/20 lg:hidden" onClick={onClose} aria-label="Close panel" />
      <aside className="fixed bottom-0 left-0 top-0 z-50 w-full max-w-md border-r border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-zinc-950 sm:rounded-r-3xl lg:left-[244px]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h2>
          <button className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-white/10" onClick={onClose}>
            <X size={22} />
          </button>
        </div>
        <div className="h-[calc(100vh-65px)] overflow-y-auto p-5">{children}</div>
      </aside>
    </>
  );
}
