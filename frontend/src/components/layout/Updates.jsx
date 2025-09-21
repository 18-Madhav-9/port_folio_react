import { Bell } from "lucide-react";
import MusicPlayer from "../common/MusicPlayer";

const Updates = () => (
  <div className="space-y-6">
    <div>
      <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 transition-colors">
        <Bell className="w-4 h-4 text-amber-500" />
        Recent Updates
      </div>
      <div className="space-y-3">
        <div className="p-3 bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-sm rounded-lg text-sm transition-colors duration-500">
          <p className="font-medium text-slate-800 dark:text-slate-200">Update Version 1.1.1</p>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Portfolio Website Changes</p>
        </div>
      </div>
    </div>

    <MusicPlayer />
  </div>
);

export default Updates;
