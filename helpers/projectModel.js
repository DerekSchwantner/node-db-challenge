const db = require("../data/db-config");

module.exports = {
  getProjects,
  addProject,
  getProjectById,
  getActionsByProjId,
  getProjectWithActions
};

function getProjects() {
  return db("projects");
}

function getProjectById(id) {
  return db("projects")
    .where({ id: id })
    .first();
}

function getActionsByProjId(id) {
  return db("actions").where({ project_id: id });
}

async function addProject(projInfo) {
  const [id] = await db("projects").insert(projInfo);

  return getProjectById(id);
}

// function getProjectWithActions(id) {
//   return db("projects as p")
//     .join("actions as a", "p.id", "a.project_id")
//     .where("project_id", id)
//     .select(
//       "p.name",
//       "p.description",
//       "a.description",
//       "a.notes",
//       "a.completedANSWERS"
//     );
// }

function getProjectWithActions(id) {
  return db("projects as p")
    .join("actions as a", "p.id", "a.project_id")
    .where({ id: id });
}
