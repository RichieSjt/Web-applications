/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('bicycles').del()
    await knex('bicycles').insert([
        { id: 1, color: 'red', model: 'BMX', lat: 19.28477, lon: 99.13729 },
        { id: 2, color: 'white', model: 'Bennoto', lat: 19.28477, lon: 99.13729 },
    ])
}
