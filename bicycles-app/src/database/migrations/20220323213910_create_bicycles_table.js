/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('bicycles', (table) => {
      table.increments('id')
      table.string('color', 255).notNullable()
      table.string('model', 255).notNullable()
      table.float('lat', 8, 6).notNullable()
      table.float('lon', 9, 6).notNullable()
      table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bicycles')
};
