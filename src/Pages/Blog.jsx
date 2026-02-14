import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, User, ChevronRight } from "lucide-react";
import { fetchBlogPosts, getCategoryColor } from "../services/blogService";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "all",
    ...new Set(posts.map((p) => p.category).filter(Boolean)),
  ];

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Banner */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

        <div className="max-w-5xl mx-auto text-left relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-2xl border-2 border-amber-500/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                  <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-transparent rounded-full"></div>
                  <span className="text-amber-400 font-bold text-sm md:text-base uppercase tracking-wider">
                    Our Blog
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                  Stories &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                    Guides
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
                  Discover travel tips, local guides, and stories from our
                  guests. Everything you need to plan your perfect stay in
                  Abeokuta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg"
                    : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-amber-500/20"
                }`}
              >
                {cat === "all" ? "All Posts" : cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading posts...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-blue-900/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-12 md:p-16 text-center shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-10 h-10 text-slate-900" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Coming Soon
              </h2>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                We're working on exciting content about Abeokuta, travel tips,
                and guest experiences. Check back soon!
              </p>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <Link
                key={index}
                to={`/blog/${post.slug}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-blue-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-2xl shadow-xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 h-full flex flex-col">
                  {/* Post Image */}
                  {post.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                      {post.category && (
                        <span
                          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(post.category)}`}
                        >
                          {post.category}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`relative h-32 bg-gradient-to-r ${getCategoryColor(post.category)} flex items-center justify-center`}
                    >
                      <BookOpen className="w-12 h-12 text-white/30" />
                      {post.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20 backdrop-blur-sm">
                          {post.category}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                      {post.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                      )}
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {post.author}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold mt-auto pt-3 border-t border-slate-700/50">
                      Read more
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
