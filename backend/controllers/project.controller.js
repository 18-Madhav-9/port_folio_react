const projectService = require('../services/project.service');

const getProjects = (req, res) => {
  const projects = projectService.getAllProjects();
  res.status(200).json(projects);
};

const getProjectById = (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projectService.getProjectById(projectId);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.status(200).json(project);
};

const createProject = (req, res) => {
  const { title, description, image, link, github } = req.body;

  if (!title || !description || !image || !link || !github) {
    return res.status(400).json({ 
      error: "Please provide all required fields: title, description, image, link, github" 
    });
  }

  const newProject = projectService.createProject({ title, description, image, link, github });
  res.status(201).json(newProject);
};

const updateProject = (req, res) => {
  const projectId = parseInt(req.params.id);
  const { title, description, image, link, github } = req.body;

  if (!title || !description || !image || !link || !github) {
    return res.status(400).json({ error: "Please provide all required fields for update." });
  }

  const updatedProject = projectService.updateProject(projectId, { title, description, image, link, github });

  if (!updatedProject) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.status(200).json(updatedProject);
};

const deleteProject = (req, res) => {
  const projectId = parseInt(req.params.id);
  const deletedProject = projectService.deleteProject(projectId);

  if (!deletedProject) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.status(200).json({ 
    message: "Project deleted successfully", 
    project: deletedProject 
  });
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};