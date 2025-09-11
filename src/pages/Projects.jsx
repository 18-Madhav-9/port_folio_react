import ProjectContainer from '../components/common/ProjectContainer'

const Projects = () => (
  <div className="space-y-6 animate-in fade-in duration-700">
    <div>
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors">Projects</h1>
      <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm transition-colors">Dynamically loaded projects fetched from the backend service.</p>
    </div>
    <ProjectContainer />
  </div>
);

export default Projects;