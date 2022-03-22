const dotenv = require('dotenv')

// Loads environment config
dotenv.config()

// Creates an object with the configuration
const appConfig = {
    env: process.env.NODE_ENV || 'development',
    express_port: process.env.EXPRESS_PORT || 3306,
}

module.exports = appConfig
