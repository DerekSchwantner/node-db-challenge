exports.up = function(knex) {
  return knex.schema.createTable("actions", tbl => {
    tbl.increments();

    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl.text("description").notNullable();
    tbl.text("notes").notNullable();
    tbl.boolean("completed").defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("actions");
};
