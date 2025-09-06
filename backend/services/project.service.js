const db = require('../data/project.data');

const getAllProjects = () => {
  return db.projects;
};

const getProjectById = (id) => {
  return db.projects.find((p) => p.id === id);
};

const createProject = (projectData) => {
  const newProject = {
    id: db.nextId++,
    ...projectData
  };
  db.projects.push(newProject);
  return newProject;
};

const updateProject = (id, updateData) => {
  const projectIndex = db.projects.findIndex((p) => p.id === id);
  
  if (projectIndex === -1) return null;

  db.projects[projectIndex] = {
    ...db.projects[projectIndex],
    ...updateData
  };
  
  return db.projects[projectIndex];
};

const deleteProject = (id) => {
  const projectIndex = db.projects.findIndex((p) => p.id === id);
  
  if (projectIndex === -1) return null;

  const deletedProject = db.projects.splice(projectIndex, 1);
  return deletedProject[0];
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};