exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "Complete Node DB challenge",
          description: "use migrations and create a database"
        }
      ]);
    });
};
