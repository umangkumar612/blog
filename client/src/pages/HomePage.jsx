import React from "react";
import { PulseComposer } from "../components/pulse/PulseComposer.jsx";
import { PulsePostCard } from "../components/pulse/PulsePostCard.jsx";

export function HomePage({ posts, onCreatePost }) {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-slate-950 p-6 text-white">
        <p className="text-sm font-semibold uppercase text-cyan-200">Home</p>
        <h1 className="mt-2 text-3xl font-semibold">Discover what your network is building</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          A mixed feed with follower posts, community updates, trending discussions, and creator signals.
        </p>
      </div>
      <PulseComposer onCreatePost={onCreatePost} />
      {posts.map((post) => (
        <PulsePostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
