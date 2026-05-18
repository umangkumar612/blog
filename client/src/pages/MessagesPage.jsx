import React, { useState } from "react";
import { Send } from "lucide-react";

export function MessagesPage({ messages }) {
  const [active, setActive] = useState(messages[0]);
  const [draft, setDraft] = useState("");
  const [chat, setChat] = useState([
    { from: "them", text: "Can you review the new social layout?" },
    { from: "me", text: "Yes, I am turning it into a real multi-section app." }
  ]);

  const send = () => {
    if (!draft.trim()) return;
    setChat((current) => [...current, { from: "me", text: draft.trim() }]);
    setDraft("");
  };

  return (
    <div className="grid min-h-[680px] overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.06] md:grid-cols-[280px_1fr]">
      <aside className="border-b border-slate-200 p-4 dark:border-white/10 md:border-b-0 md:border-r">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <div className="mt-5 space-y-2">
          {messages.map((message) => (
            <button
              key={message.handle}
              className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left ${active.handle === message.handle ? "bg-cyan-50 dark:bg-cyan-400/10" : "hover:bg-slate-100 dark:hover:bg-white/10"}`}
              onClick={() => setActive(message)}
            >
              <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${message.avatar}`} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{message.user}</p>
                <p className="truncate text-xs text-slate-500">{message.text}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>
      <section className="flex flex-col">
        <div className="border-b border-slate-200 p-4 dark:border-white/10">
          <p className="font-semibold">{active.user}</p>
          <p className="text-sm text-slate-500">@{active.handle}</p>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {chat.map((item, index) => (
            <div key={index} className={`flex ${item.from === "me" ? "justify-end" : "justify-start"}`}>
              <p className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${item.from === "me" ? "bg-cyan-600 text-white" : "bg-slate-100 dark:bg-white/10"}`}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 border-t border-slate-200 p-4 dark:border-white/10">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && send()}
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-transparent px-4 outline-none dark:border-white/10"
            placeholder="Message..."
          />
          <button className="rounded-2xl bg-slate-950 px-4 text-white dark:bg-white dark:text-slate-950" onClick={send}>
            <Send size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
