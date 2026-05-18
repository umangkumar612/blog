import React, { useState } from "react";
import { Radio, Users } from "lucide-react";
import { communities } from "../data/content.js";

export function CommunitiesSection() {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [createdCommunity, setCreatedCommunity] = useState(false);

  const toggleCommunity = (name) => {
    setJoinedCommunities((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name]
    );
  };

  return (
    <section id="communities" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-cyan-600 dark:text-cyan-300">Communities</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
            Spaces built around real interests
          </h2>
        </div>
        <button
          className="hidden rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950 sm:inline-flex"
          onClick={() => setCreatedCommunity((value) => !value)}
        >
          {createdCommunity ? "Community draft ready" : "Create community"}
        </button>
      </div>
      {createdCommunity && (
        <p className="mb-5 rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
          Community draft created. Add name, rules, and moderators in the community setup panel.
        </p>
      )}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {communities.map((community) => (
          <article
            key={community.name}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.06]"
          >
            <div className={`h-28 bg-gradient-to-br ${community.color}`} />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{community.name}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/10">
                  <Users size={16} className="mb-2 text-cyan-500" />
                  <p className="font-semibold text-slate-950 dark:text-white">{community.members}</p>
                  <p className="text-slate-500 dark:text-slate-400">members</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/10">
                  <Radio size={16} className="mb-2 text-rose-500" />
                  <p className="font-semibold text-slate-950 dark:text-white">{community.posts}</p>
                  <p className="text-slate-500 dark:text-slate-400">posts</p>
                </div>
              </div>
              <button
                className={`mt-5 w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  joinedCommunities.includes(community.name)
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200"
                    : "border-slate-200 text-slate-700 hover:border-cyan-300 hover:text-cyan-700 dark:border-white/10 dark:text-slate-200"
                }`}
                onClick={() => toggleCommunity(community.name)}
              >
                {joinedCommunities.includes(community.name) ? "Joined" : "Join community"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
