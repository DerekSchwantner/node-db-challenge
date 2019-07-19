exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("actions")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          project_id: 1,
          description: "Fork and Clone Repository",
          notes: "Repo URL: etc"
        },
        {
          project_id: 1,
          description: "Install Dependencies",
          notes: "don't forget to use yarn to make package.json"
        },
        {
          project_id: 1,
          description: "Design and Build API Endpoints",
          notes: "need to do only 3 CRUD operations"
        }
      ]);
    });
};
