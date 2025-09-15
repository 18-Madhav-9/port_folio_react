import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Calendar,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { fetchArticlesFromBackend } from "../../services/api";

const ArticleDetail = () => {
  const { slug } = useParams();
  const location = useLocation();

  const [article, setArticle] = useState(location.state?.article || null);
  const [loading, setLoading] = useState(!location.state?.article);

  useEffect(() => {
    const loadArticle = async () => {
      if (article) return;

      try {
        const articles = await fetchArticlesFromBackend();
        const found = articles.find((a) => a.slug === slug);
        setArticle(found || null);
      } catch (error) {
        console.error("Failed to load article:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, article]);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const resolveImageSrc = (src) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/")) return src;
    return `http://localhost:5000/${src}`;
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 p-6 max-w-4xl mx-auto">
        <div className="h-6 w-32 bg-slate-200/50 dark:bg-slate-700/50 rounded"></div>
        <div className="h-48 bg-slate-200/50 dark:bg-slate-700/50 rounded-2xl"></div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded"></div>
          <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-slate-500 dark:text-slate-400 mb-4">Article not found</p>
        <Link
          to="/thoughts"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <Link
        to="/thoughts"
        className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to thoughts
      </Link>

      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {article.tags?.[0] && (
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              {article.tags[0]}
            </span>
          )}

          <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Calendar className="w-3 h-3" />
            {formatDate(article.createdAt)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg border-l-4 border-indigo-500/40 pl-4">
            {article.excerpt}
          </p>
        )}
      </div>

      {article.coverImage && (
        <div className="overflow-hidden rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-sm bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl">
          <img
            src={resolveImageSrc(article.coverImage)}
            alt={article.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )}

      <article className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 md:p-10 shadow-sm leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-10 mb-4 text-slate-800 dark:text-slate-100">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mt-8 mb-3 text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700/50 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold mt-6 mb-2 text-slate-800 dark:text-slate-100">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="my-5 text-slate-700 dark:text-slate-300 text-lg leading-8">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="my-5 list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 text-lg">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-5 list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300 text-lg">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                {children}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-6 border-l-4 border-indigo-500/50 bg-slate-50/80 dark:bg-slate-900/30 pl-4 pr-4 py-3 rounded-r-lg text-slate-600 dark:text-slate-400 italic">
                {children}
              </blockquote>
            ),
            code: ({ inline, children, className }) =>
              inline ? (
                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 text-sm">
                  {children}
                </code>
              ) : (
                <pre className="my-6 overflow-x-auto rounded-xl bg-slate-900 text-slate-100 p-5 text-sm shadow-inner">
                  <code className={className}>{children}</code>
                </pre>
              ),
            img: ({ src, alt }) => (
              <figure className="my-8">
                <img
                  src={resolveImageSrc(src)}
                  alt={alt || "Article image"}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
                  loading="lazy"
                />
                {alt && (
                  <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    {alt}
                  </figcaption>
                )}
              </figure>
            ),
            table: ({ children }) => (
              <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full border-collapse text-left">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-slate-50 dark:bg-slate-800/50">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="border-b border-slate-200 dark:border-slate-700 p-4 font-semibold text-slate-800 dark:text-slate-200">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border-b border-slate-200 dark:border-slate-700 p-4 text-slate-700 dark:text-slate-300">
                {children}
              </td>
            ),
            hr: () => (
              <hr className="my-10 border-slate-200 dark:border-slate-700" />
            ),
          }}
        >
          {article.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default ArticleDetail;