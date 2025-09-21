import { useState, useEffect } from "react";

// --- LAYOUT COMPONENTS ---
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-slate-600 dark:text-slate-300 font-medium text-sm ml-4 tabular-nums transition-colors">
      {time.toLocaleTimeString([], { hour12: false })}
    </div>
  );
};

export default Clock;