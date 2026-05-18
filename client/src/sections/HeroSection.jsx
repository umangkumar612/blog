import React from "react";
import { ArrowRight, Bell, MessageCircle, Radio, Users, Zap } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (id) => {
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-16 lg:pt-14">
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-200">
          <Zap size={16} /> Social network for builders, creators, and communities
        </div>
        <h2 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
          Turn ideas into a <span className="animated-gradient-text">living social graph.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Blogify is now a premium social platform with real-time feeds, creator profiles, stories,
          communities, live rooms, messaging, reactions, reposts, bookmarks, and intelligent discovery.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-white dark:text-slate-950"
            onClick={() => scrollToSection("feed")}
          >
            Launch your network <ArrowRight size={18} />
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
            onClick={() => scrollToSection("live-room")}
          >
            Join live room <Radio size={18} />
          </button>
        </div>
        <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
          {[
            ["2.8M", "Network reach"],
            ["184k", "Daily reactions"],
            ["42k", "Active communities"]
          ].map(([value, label]) => (
            <div key={label} className="glass-panel rounded-2xl p-4">
              <p className="text-3xl font-semibold text-slate-950 dark:text-white">{value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-h-[530px]">
        <div className="hero-device absolute inset-x-0 top-0 mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white/85 p-4 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
          <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Live social feed</p>
                <h3 className="mt-1 text-2xl font-semibold">Builder pulse</h3>
              </div>
              <Users className="text-cyan-300" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Maya", "Started a thread on feed ranking", "1.8k"],
                ["Nora", "Shared a UI prototype", "980"],
                ["Arjun", "Opened a live room", "642"]
              ].map(([name, action, count], index) => (
                <div key={action} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${
                      ["from-cyan-500 to-emerald-400", "from-fuchsia-500 to-rose-400", "from-amber-400 to-orange-500"][index]
                    }`} />
                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-slate-300">{action}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-300">
                    <MessageCircle size={14} /> {count} people engaged
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="floating-card absolute bottom-8 left-0 w-64 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Graph momentum</p>
          <p className="mt-2 text-3xl font-semibold">98.4%</p>
          <div className="mt-4 flex gap-1">
            {[80, 64, 92, 74, 100, 84].map((height, index) => (
              <span
                key={index}
                className="w-full rounded-full bg-cyan-400"
                style={{ height: `${height / 4}px` }}
              />
            ))}
          </div>
        </div>
        <div className="floating-card-slow absolute bottom-0 right-0 w-72 rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900">
          <p className="flex items-center gap-2 font-semibold">
            <Bell size={18} className="text-amber-500" /> Smart notifications
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Mentions, follows, reposts, live-room invites, and community milestones in one activity hub.
          </p>
        </div>
      </div>
    </section>
  );
}
