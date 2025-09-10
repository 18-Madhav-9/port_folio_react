import { Link, useLocation } from "react-router-dom";
import { 
  Home as HomeIcon, 
  Folder, 
  Layers, 
  MessageSquare, 
  BarChart2, 
  Mail 
} from "lucide-react";

const Section = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/projects", label: "Projects", icon: Folder },
    { path: "/stack", label: "Stack", icon: Layers },
    { path: "/thoughts", label: "Thoughts", icon: MessageSquare },
    { path: "/stats", label: "Stats", icon: BarChart2 },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* --- PROFILE IMAGE SECTION --- */}
      <div className="flex flex-col items-center justify-center mb-6 mt-2">
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg ring-4 ring-white/80 dark:ring-slate-800/80 transition-transform hover:scale-105 duration-500">
          <img 
            src="" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full transition-colors duration-500"></div>
        </div>
        <h2 className="mt-4 font-bold text-lg text-slate-800 dark:text-slate-100 text-center transition-colors">Madhav</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1 text-center transition-colors">Software Engineer</p>
      </div>

      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-3 border-t border-slate-200 dark:border-slate-700/50 pt-6 transition-colors">
        Navigation
      </div>
      
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-300 w-full text-left ${
              isActive
                ? "bg-white/80 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-medium shadow-sm border border-white/50 dark:border-indigo-500/20 backdrop-blur-md"
                : "text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100 border border-transparent"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}`} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default Section;