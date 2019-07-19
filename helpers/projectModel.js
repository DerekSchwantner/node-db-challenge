const db = require("../data/db-config");

module.exports = {
  getProjects,
  addProject,
  getProjectWithActions
};

function getProjects() {
  return db("projects");
}

async function addProject(projInfo) {
  const [id] = await db("projects").insert(projInfo);

  return getProjectById(id);
}

function getProjectWithActions() {
  return db("projects");
}
