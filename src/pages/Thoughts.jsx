import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { fetchArticlesFromBackend } from "../services/api";

const Thoughts = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticlesFromBackend();
        setArticles(data);
      } catch (error) {
        console.error("Failed to load articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors">
          Thoughts & Blog
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm transition-colors">
          Writings on software engineering, design, and technology.
        </p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          [1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 p-6 rounded-2xl shadow-sm animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-4 h-[104px]"
            >
              <div className="w-full">
                <div className="flex gap-2 mb-3">
                  <div className="h-4 w-16 bg-slate-200/50 dark:bg-slate-700/50 rounded-full" />
                  <div className="h-4 w-24 bg-slate-200/50 dark:bg-slate-700/50 rounded-full" />
                </div>
                <div className="h-6 w-3/4 bg-slate-200/50 dark:bg-slate-700/50 rounded" />
              </div>
            </div>
          ))
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <Link
              key={article.id}
              to={`/thoughts/${article.slug}`}
              state={{ article }}
              className="group block bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-lg dark:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {article.tags && article.tags.length > 0 && (
                      <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-500/20">
                        {article.tags[0]}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.createdAt)}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {article.title}
                  </h2>

                  {article.excerpt && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-slate-500 dark:text-slate-400 p-4">
            No articles published yet. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
};

export default Thoughts;