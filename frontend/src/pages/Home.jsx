import { Link } from "react-router-dom";
import { ArrowRight, Code, Layers,Binary} from "lucide-react";

const Home = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 p-8 md:p-12 rounded-3xl shadow-lg shadow-black/5 dark:shadow-black/30 transition-colors">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide uppercase mb-6 border border-indigo-200 dark:border-indigo-500/30 transition-colors">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        Available for work
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6 transition-all">
        Hello, I'm Madhav Sharma.
      </h1>
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl transition-colors">
        I'm a passionate Software Engineer specializing in building exceptional digital experiences. I blend robust backend logic with pixel-perfect frontend design to create software that feels alive.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
         <Link to="/projects" className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
           View My Work <ArrowRight className="w-4 h-4" />
         </Link>
         <Link to="/contact" className="flex items-center justify-center gap-2 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border border-white/60 dark:border-slate-600/50 text-slate-800 dark:text-slate-200 px-6 py-3 rounded-xl font-medium hover:bg-white/80 dark:hover:bg-slate-700 hover:shadow-md transition-all duration-300">
           Get in Touch
         </Link>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "Frontend", desc: "React, Tailwind, Next.js", icon: Code, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Backend", desc: "Node, Express, MongoDB", icon: Layers, color: "text-amber-500", bg: "bg-amber-500/10" },
        { title: "System", desc: "C++, C", icon: Binary, color: "text-purple-500", bg: "bg-purple-500/10" }
      ].map((feature, i) => (
        <div key={i} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/40 dark:border-slate-700/50 p-6 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
           <div className={`p-3 rounded-xl ${feature.bg} ${feature.color}`}>
             <feature.icon className="w-6 h-6" />
           </div>
           <div>
             <h3 className="font-bold text-slate-800 dark:text-slate-100">{feature.title}</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{feature.desc}</p>
           </div>
        </div>
      ))}
    </div>
  </div>
);

export default Home;