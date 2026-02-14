const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const SHEET_URL = SHEET_ID
  ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Posts`
  : null;

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

// Parse Google Sheets JSONP response into post objects
const parseSheetData = (text) => {
  const jsonStr = text.match(
    /google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/
  );
  if (!jsonStr || !jsonStr[1]) return [];

  const data = JSON.parse(jsonStr[1]);
  const headers = data.table.cols.map((col) =>
    col.label?.toLowerCase().trim()
  );
  const rows = data.table.rows;

  return rows
    .map((row) => {
      const post = {};
      row.c.forEach((cell, i) => {
        const key = headers[i];
        if (key) {
          post[key] = cell ? cell.v : "";
        }
      });
      // Auto-generate slug from title
      post.slug = generateSlug(post.title);
      return post;
    })
    .filter(
      (post) =>
        post.published === true ||
        post.published === "TRUE" ||
        post.published === "true"
    );
};

// Fetch all published blog posts
let cachedPosts = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchBlogPosts = async () => {
  // Return cached data if fresh
  if (cachedPosts && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedPosts;
  }

  if (!SHEET_URL) return [];

  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();
    cachedPosts = parseSheetData(text);
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
