const db = require("../data/db-config");

module.exports = {
  addAction,
  getActionById
};

function getActionById(id) {
  return db("actions")
    .where("id", id)
    .first();
}

async function addAction(action) {
  const [id] = await db("actions").insert(action);

  return getActionById(id);
}
