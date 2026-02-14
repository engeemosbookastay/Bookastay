import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Copy,
  Check,
  BookOpen,
  Facebook,
  Twitter,
} from "lucide-react";
import { fetchBlogPostBySlug, getCategoryColor } from "../services/blogService";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    fetchBlogPostBySlug(slug)
      .then((found) => {
        if (found) {
          setPost(found);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const currentUrl = window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = currentUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${post.title} - ${currentUrl}`)}`,
      "_blank"
    );
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="pt-28 md:pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-slate-900" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-400 mb-8">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="pt-28 md:pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Top Bar: Back + Share */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShareOpen(!shareOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-amber-500/20 rounded-xl text-gray-300 hover:text-white hover:border-amber-500/40 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>

              {/* Share Dropdown */}
              {shareOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShareOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-slate-800 border border-amber-500/20 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <button
                      onClick={handleCopyLink}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all text-sm"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied ? "Link copied!" : "Copy link"}
                    </button>
                    <button
                      onClick={handleShareWhatsApp}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Share on WhatsApp
                    </button>
                    <button
                      onClick={handleShareTwitter}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Share on X
                    </button>
                    <button
                      onClick={handleShareFacebook}
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Share on Facebook
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Post Content */}
          <article className="relative">
            {/* Hero Image */}
            {post.image && (
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
            )}

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {post.category && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(post.category)}`}
                >
                  {post.category}
                </span>
              )}
              {post.date && (
                <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
              )}
              {post.author && (
                <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Content */}
            <div className="max-w-none">
              {post.content?.split("\n").map((para, i) =>
                para.trim() ? (
                  <p
                    key={i}
                    className="text-gray-300 leading-relaxed mb-5 text-base md:text-lg"
                  >
                    {para}
                  </p>
                ) : (
                  <div key={i} className="h-4"></div>
                )
              )}
            </div>

            {/* Bottom Share Bar */}
            <div className="mt-12 pt-8 border-t border-slate-700/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-gray-400 text-sm">
                  Enjoyed this article? Share it with others.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-amber-500/20 rounded-lg text-gray-300 hover:text-white hover:border-amber-500/40 transition-all text-sm"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy link"}
                  </button>
                  <button
                    onClick={handleShareWhatsApp}
                    className="p-2 bg-slate-800/80 border border-amber-500/20 rounded-lg text-gray-300 hover:text-green-400 hover:border-green-400/40 transition-all"
                    title="Share on WhatsApp"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                  <button
                    onClick={handleShareTwitter}
                    className="p-2 bg-slate-800/80 border border-amber-500/20 rounded-lg text-gray-300 hover:text-blue-400 hover:border-blue-400/40 transition-all"
                    title="Share on X"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Back to Blog CTA */}
            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-amber-500/50 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                More Articles
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
