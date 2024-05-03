/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("categoryName").notNullable();
    table
    .integer("userId")
    .unsigned()
    .references("users.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("category");
};
