const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const appConfig = require('./configs/app')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const bicycleRoutes = require('./routes/bicycleRoutes')

const app = express()
const port = appConfig.express_port

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/bicycles', bicycleRoutes)

app.listen(port, () => {
    console.log(`Server is up on port ${port}. (http://localhost:${port})`)
})

module.exports = app
