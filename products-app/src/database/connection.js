let appConfig = require('../configs/app')

const knexfile = require('./knexfile')

// Obtaining the configuration data depending on the application environment
// with these configuration data create an instance of knex
const knex = require('knex')(knexfile[appConfig.env])

module.exports = knex
