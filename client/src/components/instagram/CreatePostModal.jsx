import React, { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

export function CreatePostModal({ open, onClose, onCreatePost }) {
  const [caption, setCaption] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  if (!open) return null;

  const createPost = () => {
    if (!caption.trim() && !fileName) return;
    onCreatePost({ content: caption || `Shared ${fileName}`, mediaName: fileName });
    setCaption("");
    setFileName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
          <button className="text-sm font-semibold text-slate-500" onClick={onClose}>
            Cancel
          </button>
          <h2 className="font-semibold text-slate-950 dark:text-white">Create new post</h2>
          <button
            className="text-sm font-semibold text-sky-500 disabled:text-sky-200"
            disabled={!caption.trim() && !fileName}
            onClick={createPost}
          >
            Share
          </button>
        </div>
        <div className="grid min-h-[520px] md:grid-cols-[1.1fr_0.9fr]">
          <button
            className="flex min-h-[320px] flex-col items-center justify-center bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-200"
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus size={48} />
            <span className="mt-4 text-lg font-semibold">
              {fileName || "Select photos or videos"}
            </span>
            <span className="mt-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">
              Choose from computer
            </span>
            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
            />
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-white/10">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-slate-950 to-cyan-500" />
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">umang</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">New post</p>
              </div>
            </div>
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              className="min-h-56 flex-1 resize-none bg-transparent p-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
              placeholder="Write a caption..."
            />
            <div className="border-t border-slate-100 p-4 text-sm text-slate-500 dark:border-white/10">
              {caption.length}/2,200
            </div>
          </div>
        </div>
      </div>
      <button className="fixed right-5 top-5 text-white" onClick={onClose} aria-label="Close create modal">
        <X size={32} />
      </button>
    </div>
  );
}
