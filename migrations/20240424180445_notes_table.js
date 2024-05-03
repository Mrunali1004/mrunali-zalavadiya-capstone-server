/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.hasTable("notes").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("notes", (table) => {
        table.increments("id").primary();
        table.integer("userId").unsigned().references("users.id");
        table.integer("categoryId").unsigned().references("category.id");
        table.string("title").notNullable();
        table.text("content", "LONGTEXT").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("modified_at").defaultTo(knex.fn.now());
      });
    }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("notes");
};
