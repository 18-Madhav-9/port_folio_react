import NavBar from "./NavBar";
import Section from "./Section";
import Updates from "./Updates";
import { useTheme } from "../../context/ThemeContext";


const AppContent = ({ children }) => {
  const { isDark } = useTheme();

  const themeBg = isDark
    ? "bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950"
    : "bg-gradient-to-br from-slate-50 via-white to-indigo-100";

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${themeBg}`}>
        <header className="sticky top-4 z-50 w-full max-w-[1400px] mx-auto px-4 md:px-6 pt-2 mb-2">
          <NavBar />
        </header>
        
        <div className="flex-1 w-full max-w-[1400px] mx-auto flex items-start gap-4 md:gap-6 p-4 md:p-6 overflow-x-auto">
          <aside className="w-56 flex-shrink-0 sticky top-24 bg-white/85 dark:bg-slate-900/70 backdrop-blur-xl p-4 rounded-xl border border-white/50 dark:border-slate-700/40 shadow-lg shadow-black/5 dark:shadow-black/30 transition-colors duration-500">
            <Section />
          </aside>
          
          <main className="flex-1 min-w-[400px] bg-white/85 dark:bg-slate-900/70 backdrop-blur-xl p-6 rounded-xl border border-white/50 dark:border-slate-700/40 shadow-lg shadow-black/5 dark:shadow-black/30 flex flex-col min-h-[700px] transition-colors duration-500">
            {children}
          </main>

          <aside className="w-64 flex-shrink-0 sticky top-24 bg-white/85 dark:bg-slate-900/70 backdrop-blur-xl p-4 rounded-xl border border-white/50 dark:border-slate-700/40 shadow-lg shadow-black/5 dark:shadow-black/30 transition-colors duration-500">
            <Updates />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AppContent;