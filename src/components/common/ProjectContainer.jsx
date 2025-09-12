import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import fetchProjectsFromBackend from "../../services/api";


const ProjectContainer = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjectsFromBackend();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((skeleton) => (
          <div key={skeleton} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-white/40 dark:border-slate-700/50 rounded-xl overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/30 animate-pulse">
            <div className="h-48 bg-slate-200/50 dark:bg-slate-700/50 w-full"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-slate-200/50 dark:bg-slate-700/50 rounded w-2/3"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-full"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-4/5"></div>
              <div className="h-10 bg-slate-200/50 dark:bg-slate-700/50 rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-white/40 dark:border-slate-700/50 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/30 overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl duration-500">
          <div className="h-48 overflow-hidden relative border-b border-white/30 dark:border-slate-700/50">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 transition-colors">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 flex-1 leading-relaxed transition-colors">{project.description}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-100/80 dark:bg-indigo-500/20 backdrop-blur-sm text-indigo-700 dark:text-indigo-400 border border-white/50 dark:border-indigo-500/30 py-2.5 px-4 rounded-lg hover:bg-slate-200 dark:hover:bg-indigo-600 hover:text-indigo-800 dark:hover:text-white transition-colors font-medium text-sm group">
                View Project <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors border border-slate-200/50 dark:border-slate-600/50 py-2.5 px-4 rounded-lg font-medium text-sm group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 opacity-70 group-hover:opacity-100"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Source Code
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProjectContainer;
