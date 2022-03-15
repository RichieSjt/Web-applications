const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const appConfig = require('./configs/app')
const mainRoutes = require('./routes/app-routes')

// Obtiene una instancia de express
const app = express()
const port = appConfig.express_port

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const layoutsPath = path.join(__dirname, '..', 'views', 'layouts');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(mainRoutes)

// Crea una instancia de hbs con las configuraciones definidas
let hbs = exphbs.create({
    extname: 'hbs',
    layoutsDir: layoutsPath,
    defaultLayout: 'main',
    // helpers: 'path/to/helpers/directory',
    // partialsDir: ['path/to/partials/directory'],
})

// Establece el uso de handlebars dentro de express.js
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.listen(port, () => { 
    console.log(`Server is up on port ${port}. (http://localhost:${port})`)
})