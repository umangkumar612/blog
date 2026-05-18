import React, { useRef, useState } from "react";
import { ImagePlus, Send, Sparkles } from "lucide-react";

export function PulseComposer({ onCreatePost }) {
  const [body, setBody] = useState("");
  const [mediaName, setMediaName] = useState("");
  const inputRef = useRef(null);

  const submit = () => {
    if (!body.trim() && !mediaName) return;
    onCreatePost({ content: body || `Shared ${mediaName}`, mediaName });
    setBody("");
    setMediaName("");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
      <div className="flex gap-4">
        <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-slate-950 to-cyan-500" />
        <div className="min-w-0 flex-1">
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="min-h-24 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            placeholder="Share an update with followers or communities..."
          />
          {mediaName && (
            <p className="mt-3 rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
              Attached: {mediaName}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={(event) => setMediaName(event.target.files?.[0]?.name || "")}
              />
              <button className="icon-only" onClick={() => inputRef.current?.click()} aria-label="Attach media">
                <ImagePlus size={18} />
              </button>
              <button className="icon-only" onClick={() => setBody((value) => `${value}${value ? " " : ""}#buildinpublic`)}>
                <Sparkles size={18} />
              </button>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-slate-950"
              disabled={!body.trim() && !mediaName}
              onClick={submit}
            >
              Publish <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
