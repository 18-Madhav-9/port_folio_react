import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext"; 

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        isDark
          ? 'bg-indigo-600'
          : 'bg-slate-200 border border-slate-300 shadow-inner'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-indigo-600" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;