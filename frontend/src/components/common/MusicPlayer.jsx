import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

const MusicPlayer = () => {
  const [track, setTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNewTrack = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const tracks = [
        { id: 'jfKfPfyJRdk', title: 'lofi hip hop radio - beats to relax/study to' },
        { id: '4xDzrJKXOOY', title: 'synthwave radio 🌌 - beats to chill/game to' },
        { id: '5qap5aO4i9A', title: 'lofi hip hop radio - beats to sleep/chill to' },
        { id: 'rUxyKA_-grg', title: 'Chillhop Radio - jazzy & lofi hip hop beats' },
        { id: '7NOSDKb0HlU', title: 'NCS: Top 50 Best Songs' }
      ];
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let newTrack;
      do {
        newTrack = tracks[Math.floor(Math.random() * tracks.length)];
      } while (track && newTrack.id === track.id);
      
      setTrack(newTrack);
    } catch (err) {
      setError("Failed to load music.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewTrack();
  }, []);

  return (
    <div className="flex flex-col gap-3 mt-8">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100 transition-colors">
          <Activity className="w-4 h-4 text-emerald-500" />
          Music Player
        </div>
        <button 
          onClick={loadNewTrack}
          disabled={isLoading}
          className="text-xs bg-white/60 dark:bg-slate-800/60 hover:bg-white/90 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 px-2 py-1 rounded transition-colors disabled:opacity-50 font-medium border border-white/40 dark:border-slate-700/40 shadow-sm backdrop-blur-md"
        >
          {isLoading ? "Skipping..." : "Skip Track"}
        </button>
      </div>
      
      <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-lg overflow-hidden shadow-lg shadow-black/5 dark:shadow-black/30 transition-colors duration-500">
        {isLoading ? (
          <div className="h-36 bg-slate-100/50 dark:bg-slate-800/50 animate-pulse flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
            <Activity className="w-6 h-6 animate-bounce mb-2" />
            <span className="text-xs font-medium uppercase tracking-widest">Tuning In</span>
          </div>
        ) : error ? (
          <div className="h-36 flex items-center justify-center text-red-500 dark:text-red-400 text-sm">
            {error}
          </div>
        ) : (
          <div className="aspect-video w-full relative">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${track?.id}?autoplay=0&controls=1`}
              title={track?.title}
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        )}
        <div className="p-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-t border-white/40 dark:border-slate-700/50 transition-colors duration-500">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate" title={track?.title}>
            {isLoading ? "Loading next track..." : track?.title}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">YouTube Radio</p>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
