// Connecting to DB
const knex = require('../database/connection')

// Creating a new bicycle without storing it on the database
exports.factory = (color, model, lat, lon) => {
    return {
        color,
        model,
        lat,
        lon
    }
}

// Returns all bicycles in the database
exports.all = () => {
    return knex.select('*').from('bicycles')
}

exports.create = ({ color, model, lat, lon }) => {
    return knex('bicycles').insert({
        color,
        model,
        lat, 
        lon
    })
}

exports.find = (id) => {
    return knex.select('*').from('bicycles').where('id', id).first()
}

exports.update = (id, bicycle) => {
    return knex('bicycles')
        .update(bicycle)
        .update('updated_at', knex.fn.now())
        .where('id', id)
}

exports.delete = (id) => {
    return knex('bicycles').delete().where('id', id)
}
