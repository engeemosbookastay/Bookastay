import { backendUrl } from '../App';

// Generate a URL-friendly slug from a title
export const generateSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
};

// Fetch all published blog posts from the backend
let cachedPosts = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchBlogPosts = async () => {
  // Return cached data if fresh
  if (cachedPosts && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedPosts;
  }

  try {
    const res = await fetch(`${backendUrl}/api/blog`);
    const d = await res.json();
    cachedPosts = d.success ? (d.posts || []) : [];
    cacheTime = Date.now();
    return cachedPosts;
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return cachedPosts || [];
  }
};

// Find a single post by slug
export const fetchBlogPostBySlug = async (slug) => {
  const posts = await fetchBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
};

// Category color mapping
const categoryColors = {
  "Travel Tips": "from-blue-500 to-cyan-500",
  "Abeokuta Guide": "from-emerald-500 to-teal-500",
  "Guest Stories": "from-amber-500 to-orange-500",
  "Property News": "from-purple-500 to-pink-500",
  "Local Culture": "from-rose-500 to-red-500",
  "Food & Dining": "from-orange-500 to-amber-500",
};

export const getCategoryColor = (category) => {
  return categoryColors[category] || "from-blue-900 to-blue-800";
};
