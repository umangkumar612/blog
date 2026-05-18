import React, { useRef, useState } from "react";
import { ImagePlus, Mic, Send, Smile, Video } from "lucide-react";

export function Composer({ onCreatePost }) {
  const [text, setText] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [status, setStatus] = useState("");
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handlePost = () => {
    const content = text.trim();

    if (!content && !mediaName) {
      setStatus("Write something or select a file before posting.");
      return;
    }

    onCreatePost({
      content: content || `Shared a new media update: ${mediaName}`,
      mediaName
    });
    setText("");
    setMediaName("");
    setStatus("Posted to your feed.");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setMediaName(file.name);
    setStatus(`${file.name} selected. Click Post to publish it to the feed preview.`);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
      <div className="flex gap-4">
        <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-slate-950 to-cyan-500" />
        <div className="min-w-0 flex-1">
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="min-h-24 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            placeholder="Share an update, thread, poll, launch, or idea with your network..."
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                ref={imageInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <input
                ref={videoInputRef}
                className="hidden"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
              />
              <button
                className="icon-only"
                onClick={() => imageInputRef.current?.click()}
                aria-label="Add image"
              >
                <ImagePlus size={18} />
              </button>
              <button
                className="icon-only"
                onClick={() => videoInputRef.current?.click()}
                aria-label="Add video"
              >
                <Video size={18} />
              </button>
              <button
                className="icon-only"
                onClick={() => setStatus("Audio recording preview enabled. Backend recording can be wired next.")}
                aria-label="Record audio"
              >
                <Mic size={18} />
              </button>
              <button
                className="icon-only"
                onClick={() => setText((value) => `${value}${value ? " " : ""}:sparkles:`)}
                aria-label="Add emoji"
              >
                <Smile size={18} />
              </button>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 dark:bg-white dark:text-slate-950"
              onClick={handlePost}
            >
              Post <Send size={18} />
            </button>
          </div>
          {status && (
            <p className="mt-3 rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
              {status}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
