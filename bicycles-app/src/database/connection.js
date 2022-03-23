let appConfig = require('../configs/app')

const knexfile = require('./knexfile')

// Creating an instance of knex depending on the application environment
const knex = require('knex')(knexfile[appConfig.env])

module.exports = knex
