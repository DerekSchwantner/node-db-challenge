const express = require("express");

const ProjectDb = require("../helpers/projectModel");

const router = express.Router();

//Gets list of all projects
router.get("/", async (req, res) => {
  try {
    const projects = await ProjectDb.getProjects();
    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "Unable to locate projects" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//Gets project by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const project = await ProjectDb.getProjectById(id);
    console.log("the project is:", project);
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "Unable to locate project with that id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get project" });
  }
});

//Adds a project
router.post("/", validateProjectInfo, async (req, res) => {
  const projInfo = req.body;
  try {
    const addProj = await ProjectDb.addProject(projInfo);
    res.status(200).json(addProj);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Gets a list of actions by project ID
router.get("/:id/actions", async (req, res) => {
  const id = req.params.id;

  try {
    const findProj = await ProjectDb.getProjectById(id);
    console.log("is the project found:", findProj);
    const projectActions = await ProjectDb.getActionsByProjId(id);
    if (findProj) {
      res.status(200).json(projectActions);
    } else {
      res.status(404).json({
        message: "Unable to locate actions from a project with that id"
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get actions" });
  }
});

//Gets a project with actions attatched

router.get("/:id/projActions", async (req, res) => {
  const id = req.params.id;

  try {
    const findProj = await ProjectDb.getProjectById(id);
    console.log("is the project found:", findProj);
    const projectWithActions = await ProjectDb.getProjectWithActions(id);
    if (findProj) {
      res.status(200).json(projectWithActions);
    } else {
      res.status(404).json({
        message: "Unable to locate actions from a project with that id"
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error trying to get actions" });
  }
});

//Middleware
function validateProjectInfo(req, res, next) {
  const projectInfo = req.body;
  console.log("time to validate the project info");
  if (!projectInfo.name || !projectInfo.description) {
    res.status(400).json({ message: "missing project data" });
  } else {
    next();
  }
}
module.exports = router;
