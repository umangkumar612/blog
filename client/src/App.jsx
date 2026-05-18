import React, { useMemo, useState } from "react";
import { CreatePostModal } from "./components/instagram/CreatePostModal.jsx";
import { InsightRail } from "./components/pulse/InsightRail.jsx";
import { PulseNav } from "./components/pulse/PulseNav.jsx";
import {
  instagramMessages,
  instagramNotifications,
  pulseCommunities,
  pulsePeople,
  pulsePosts
} from "./data/content.js";
import { ExplorePage } from "./pages/ExplorePage.jsx";
import { FollowingPage } from "./pages/FollowingPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { MessagesPage } from "./pages/MessagesPage.jsx";
import { NotificationsPage } from "./pages/NotificationsPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";

export function App() {
  const [activePage, setActivePage] = useState("home");
  const [createOpen, setCreateOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(pulsePosts);
  const [people, setPeople] = useState(pulsePeople);

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        `${post.author} ${post.handle} ${post.group} ${post.body} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [posts, query]
  );

  const followingPosts = useMemo(() => {
    const followedHandles = people.filter((person) => person.following).map((person) => person.handle);
    return posts.filter((post) => post.following || followedHandles.includes(post.handle));
  }, [people, posts]);

  const handleCreatePost = ({ content, mediaName }) => {
    const newPost = {
      id: `pulse-${Date.now()}`,
      author: "Umang Kataria",
      handle: "umang",
      role: "Creator",
      group: "My Network",
      time: "now",
      following: true,
      format: mediaName ? "Media Update" : "Status",
      body: content || `Shared ${mediaName}`,
      media: mediaName
        ? "from-slate-950 via-cyan-600 to-fuchsia-500"
        : "from-cyan-500 via-sky-500 to-violet-500",
      reactions: 0,
      replies: 0,
      reposts: 0,
      reach: "0",
      tags: ["blogify", "newpost"],
      accent: "from-slate-950 to-cyan-500"
    };

    setPosts((current) => [newPost, ...current]);
    setActivePage("home");
  };

  const toggleFollow = (handle) => {
    setPeople((current) =>
      current.map((person) =>
        person.handle === handle ? { ...person, following: !person.following } : person
      )
    );
  };

  const renderPage = () => {
    if (activePage === "following") {
      return <FollowingPage posts={followingPosts} people={people} onToggleFollow={toggleFollow} />;
    }

    if (activePage === "explore") {
      return <ExplorePage posts={filteredPosts} query={query} onQueryChange={setQuery} />;
    }

    if (activePage === "messages") {
      return <MessagesPage messages={instagramMessages} />;
    }

    if (activePage === "notifications") {
      return <NotificationsPage notifications={instagramNotifications} />;
    }

    if (activePage === "profile") {
      return <ProfilePage posts={posts.filter((post) => post.handle === "umang")} />;
    }

    return <HomePage posts={filteredPosts} onCreatePost={handleCreatePost} />;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <PulseNav
        activePage={activePage}
        onCreate={() => setCreateOpen(true)}
        onNavigate={setActivePage}
      />

      <div className="lg:pl-72">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-5 pb-24 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-8">
          <section className="min-w-0">{renderPage()}</section>
          <InsightRail
            communities={pulseCommunities}
            onToggleFollow={toggleFollow}
            people={people}
          />
        </div>
      </div>

      <CreatePostModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </main>
  );
}
