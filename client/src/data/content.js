import { Eye, Heart, MessageCircle, Share2, TrendingUp, Users } from "lucide-react";

export const navItems = ["Feed", "Communities", "Messages", "Profile"];

export const socialPosts = [
  {
    author: "Maya Singh",
    handle: "@maya.systems",
    role: "Staff Engineer",
    time: "12m",
    type: "Thought",
    content:
      "The best social products make creation feel lighter than consumption. If posting has friction, the feed slowly becomes passive.",
    topic: "Product Design",
    imageGradient: "from-cyan-500 via-emerald-400 to-lime-300",
    reactions: 1840,
    comments: 214,
    shares: 96,
    views: "82k",
    accent: "from-cyan-500 to-emerald-400",
    liked: true,
    saved: true
  },
  {
    author: "Nora Patel",
    handle: "@nora.ui",
    role: "Design Engineer",
    time: "34m",
    type: "Build Log",
    content:
      "Shipping a new interaction pattern today: inline polls, creator badges, and a realtime activity rail for communities.",
    topic: "Frontend",
    imageGradient: "from-fuchsia-500 via-rose-400 to-amber-300",
    reactions: 1290,
    comments: 141,
    shares: 68,
    views: "48k",
    accent: "from-fuchsia-500 to-rose-400",
    liked: false,
    saved: false
  },
  {
    author: "Arjun Mehta",
    handle: "@arjun.data",
    role: "Data Architect",
    time: "1h",
    type: "Thread",
    content:
      "A scalable feed needs more than sorting by createdAt: graph score, freshness, quality, muted topics, and privacy rules all need to meet before ranking.",
    topic: "Feed Systems",
    imageGradient: "from-amber-400 via-orange-500 to-red-500",
    reactions: 980,
    comments: 88,
    shares: 52,
    views: "31k",
    accent: "from-amber-400 to-orange-500",
    liked: false,
    saved: false
  }
];

export const stories = [
  { name: "Maya", label: "Systems", color: "from-cyan-400 to-emerald-400" },
  { name: "Nora", label: "UI Lab", color: "from-fuchsia-500 to-rose-400" },
  { name: "Arjun", label: "Data", color: "from-amber-400 to-orange-500" },
  { name: "Elena", label: "AI", color: "from-violet-500 to-sky-500" },
  { name: "Aisha", label: "Product", color: "from-slate-900 to-cyan-500" }
];

export const creators = [
  { name: "Maya Singh", handle: "@maya.systems", topic: "Distributed systems", followers: "38k" },
  { name: "Nora Patel", handle: "@nora.ui", topic: "Design engineering", followers: "24k" },
  { name: "Arjun Mehta", handle: "@arjun.data", topic: "Feed architecture", followers: "19k" },
  { name: "Elena Brooks", handle: "@elena.ai", topic: "AI communities", followers: "31k" }
];

export const communities = [
  { name: "Frontend Foundry", members: "128k", posts: "9.4k", color: "from-fuchsia-500 to-rose-400" },
  { name: "System Design Daily", members: "94k", posts: "6.8k", color: "from-cyan-500 to-emerald-400" },
  { name: "AI Builders", members: "211k", posts: "15.2k", color: "from-violet-500 to-sky-500" },
  { name: "Startup Operators", members: "76k", posts: "4.9k", color: "from-amber-400 to-orange-500" }
];

export const trends = [
  { tag: "#buildinpublic", posts: "48.2k posts" },
  { tag: "#react19", posts: "22.7k posts" },
  { tag: "#feedranking", posts: "12.4k posts" },
  { tag: "#creatorstack", posts: "9.8k posts" }
];

export const analytics = [
  { label: "Network reach", value: "2.8M", delta: "+28.4%", icon: Eye },
  { label: "Post reactions", value: "184k", delta: "+19.1%", icon: Heart },
  { label: "Conversations", value: "46.9k", delta: "+14.8%", icon: MessageCircle },
  { label: "Shares", value: "18.2k", delta: "+11.3%", icon: Share2 }
];

export const activity = [
  "Maya started a live room in System Design Daily",
  "Nora mentioned you in Frontend Foundry",
  "Your post crossed 10k impressions",
  "Elena invited you to AI Builders"
];

export const profileStats = [
  ["46.9k", "Followers"],
  ["1.2M", "Monthly reach"],
  ["128", "Posts"],
  ["42", "Communities"]
];

export const instagramStories = [
  { name: "your story", handle: "@umang", color: "from-slate-950 via-cyan-500 to-fuchsia-500", live: false },
  { name: "maya", handle: "@maya.systems", color: "from-pink-500 via-orange-400 to-yellow-300", live: true },
  { name: "nora", handle: "@nora.ui", color: "from-fuchsia-500 via-purple-500 to-sky-400", live: false },
  { name: "arjun", handle: "@arjun.data", color: "from-emerald-400 via-cyan-400 to-blue-500", live: false },
  { name: "elena", handle: "@elena.ai", color: "from-violet-500 via-indigo-500 to-cyan-400", live: true },
  { name: "aisha", handle: "@aisha", color: "from-rose-500 via-orange-500 to-amber-300", live: false }
];

export const instagramPosts = [
  {
    id: "post-1",
    author: "Maya Singh",
    handle: "maya.systems",
    location: "Bengaluru, India",
    avatar: "from-cyan-500 to-emerald-400",
    media: "from-slate-950 via-cyan-700 to-emerald-400",
    caption:
      "Built a new realtime feed ranking prototype today. The hardest part is making discovery feel personal without making it feel trapped.",
    likes: 18420,
    comments: [
      { user: "nora.ui", text: "This visual system is clean. Need the prototype link." },
      { user: "arjun.data", text: "Ranking quality improves so much when freshness is bounded." }
    ],
    time: "12 minutes ago",
    tags: ["#feedranking", "#buildinpublic", "#socialapp"],
    liked: true,
    saved: false
  },
  {
    id: "post-2",
    author: "Nora Patel",
    handle: "nora.ui",
    location: "Design Lab",
    avatar: "from-fuchsia-500 to-rose-400",
    media: "from-fuchsia-600 via-rose-500 to-amber-300",
    caption:
      "New interaction pass for the create flow: fewer decisions, better previews, instant feedback.",
    likes: 9360,
    comments: [
      { user: "elena.ai", text: "The modal feels fast. Add keyboard shortcuts next." },
      { user: "maya.systems", text: "This is close to production." }
    ],
    time: "43 minutes ago",
    tags: ["#uidesign", "#creatorflow"],
    liked: false,
    saved: true
  },
  {
    id: "post-3",
    author: "Arjun Mehta",
    handle: "arjun.data",
    location: "Atlas Cluster",
    avatar: "from-amber-400 to-orange-500",
    media: "from-amber-400 via-orange-500 to-red-500",
    caption:
      "Social graphs are only useful when the product gives users control: mute, close friends, topics, and transparent recommendations.",
    likes: 7210,
    comments: [
      { user: "umang", text: "This should be a thread." },
      { user: "nora.ui", text: "Control is the premium feature." }
    ],
    time: "1 hour ago",
    tags: ["#mongodb", "#socialgraph", "#privacy"],
    liked: false,
    saved: false
  }
];

export const instagramSuggestions = [
  { name: "Elena Brooks", handle: "elena.ai", reason: "Followed by maya.systems", avatar: "from-violet-500 to-sky-500" },
  { name: "Riya Shah", handle: "riya.designs", reason: "Popular in UI design", avatar: "from-pink-500 to-orange-400" },
  { name: "Dev Weekly", handle: "dev.weekly", reason: "Trending community", avatar: "from-slate-900 to-cyan-500" },
  { name: "Hash Studio", handle: "hash.studio", reason: "New reels daily", avatar: "from-emerald-500 to-lime-400" }
];

export const instagramNotifications = [
  { user: "nora.ui", action: "liked your post", time: "2m", avatar: "from-fuchsia-500 to-rose-400" },
  { user: "maya.systems", action: "started following you", time: "11m", avatar: "from-cyan-500 to-emerald-400" },
  { user: "arjun.data", action: "commented: This should ship", time: "25m", avatar: "from-amber-400 to-orange-500" },
  { user: "elena.ai", action: "mentioned you in a story", time: "1h", avatar: "from-violet-500 to-sky-500" }
];

export const instagramMessages = [
  { user: "Maya Singh", handle: "maya.systems", text: "Can you review the new explore layout?", time: "now", avatar: "from-cyan-500 to-emerald-400" },
  { user: "Nora Patel", handle: "nora.ui", text: "Sent a reel concept.", time: "8m", avatar: "from-fuchsia-500 to-rose-400" },
  { user: "Arjun Mehta", handle: "arjun.data", text: "Indexes are ready.", time: "32m", avatar: "from-amber-400 to-orange-500" }
];

export const pulsePosts = [
  {
    id: "pulse-1",
    author: "Maya Singh",
    handle: "maya.systems",
    role: "Staff Engineer",
    group: "System Design Daily",
    time: "12m",
    following: true,
    format: "Build Note",
    body:
      "Prototype update: the feed now mixes follower posts, community posts, and discovery cards with a quality score instead of pure recency.",
    media: "from-cyan-500 via-emerald-400 to-lime-300",
    reactions: 1842,
    replies: 214,
    reposts: 96,
    reach: "82k",
    tags: ["feed", "systems", "social"],
    accent: "from-cyan-500 to-emerald-400"
  },
  {
    id: "pulse-2",
    author: "Nora Patel",
    handle: "nora.ui",
    role: "Design Engineer",
    group: "Frontend Foundry",
    time: "34m",
    following: true,
    format: "Prototype",
    body:
      "Testing a compact create flow with media preview, audience picker, and instant validation. It should feel like a tool, not a form.",
    media: "from-fuchsia-500 via-rose-400 to-amber-300",
    reactions: 1290,
    replies: 141,
    reposts: 68,
    reach: "48k",
    tags: ["ui", "create", "product"],
    accent: "from-fuchsia-500 to-rose-400"
  },
  {
    id: "pulse-3",
    author: "Arjun Mehta",
    handle: "arjun.data",
    role: "Data Architect",
    group: "Data Builders",
    time: "1h",
    following: false,
    format: "Thread",
    body:
      "Follower feeds should be predictable. Explore feeds can be adventurous. Mixing those two without labels makes users lose trust.",
    media: "from-amber-400 via-orange-500 to-red-500",
    reactions: 980,
    replies: 88,
    reposts: 52,
    reach: "31k",
    tags: ["ranking", "mongodb", "trust"],
    accent: "from-amber-400 to-orange-500"
  },
  {
    id: "pulse-4",
    author: "Elena Brooks",
    handle: "elena.ai",
    role: "AI Product Lead",
    group: "AI Builders",
    time: "2h",
    following: false,
    format: "Live Recap",
    body:
      "Community moderation needs assistive AI, but final control should stay with human moderators and visible rules.",
    media: "from-violet-500 via-indigo-500 to-sky-400",
    reactions: 2210,
    replies: 302,
    reposts: 144,
    reach: "116k",
    tags: ["ai", "moderation", "community"],
    accent: "from-violet-500 to-sky-500"
  }
];

export const pulsePeople = [
  { name: "Maya Singh", handle: "maya.systems", bio: "Systems, feeds, distributed product architecture", followers: "38k", accent: "from-cyan-500 to-emerald-400", following: true },
  { name: "Nora Patel", handle: "nora.ui", bio: "Design engineering and creator tooling", followers: "24k", accent: "from-fuchsia-500 to-rose-400", following: true },
  { name: "Arjun Mehta", handle: "arjun.data", bio: "MongoDB, ranking, analytics pipelines", followers: "19k", accent: "from-amber-400 to-orange-500", following: false },
  { name: "Elena Brooks", handle: "elena.ai", bio: "AI communities and moderation workflows", followers: "31k", accent: "from-violet-500 to-sky-500", following: false }
];

export const pulseCommunities = [
  { name: "Frontend Foundry", description: "UI systems, React patterns, design critiques", members: "128k", active: "4.2k online", accent: "from-fuchsia-500 to-rose-400" },
  { name: "System Design Daily", description: "Architecture notes, feed ranking, backend scale", members: "94k", active: "2.8k online", accent: "from-cyan-500 to-emerald-400" },
  { name: "AI Builders", description: "AI products, agents, moderation, research", members: "211k", active: "8.1k online", accent: "from-violet-500 to-sky-500" }
];
