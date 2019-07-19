const db = require("../data/db-config");

module.exports = {
  getProjects,
  addProject,
  getProjectById,
  getActionsByProjId,
  getProjectWithActions,
  remove
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
//     .select("*")
//     .join("actions as a", "p.id", "a.project_id");
// }

async function getProjectWithActions(id) {
  let project = await getProjectById(id);
  let actions = await getActionsByProjId(id);
  if (project) {
    return { ...project, actions };
  } else {
    return null;
  }
}

function remove(id) {
  return db("projects")
    .where("id", id)
    .del();
}

// async function remove(id) {
//   const doesIdExist = await getProjectById(id);
//   return db("projects")
//     .where({ id })
//     .del()
//     .then(deleted => {
//       if (deleted) {
//         return doesIdExist;
//       } else {
//         console.log("the id is NULL");
//         return null;
//       }
//     });
// }
