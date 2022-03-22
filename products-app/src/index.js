const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const appConfig = require('./configs/app')
const mainRoutes = require('./routes/app-routes')
const methodOverride = require('method-override')

const app = express()
const port = appConfig.express_port

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const layoutsPath = path.join(__dirname, '..', 'views', 'layouts')

// Overwritting POST method IMPORTANT: MUST GO BEFORE REQUEST PARSING SPECIFICATION
//(i.e. express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mainRoutes)

// Creates an instance of hbs with the specified configuration
let hbs = exphbs.create({
    extname: 'hbs',
    layoutsDir: layoutsPath,
    defaultLayout: 'main',
    // helpers: 'path/to/helpers/directory',
    // partialsDir: ['path/to/partials/directory'],
})

// Setting handlebars as the view engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.listen(port, () => {
    console.log(`Server is up on port ${port}. (http://localhost:${port})`)
})
