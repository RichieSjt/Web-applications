

const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')

exports.list = async (req, res, next) => {
    const users = await Usuario.find({})
    res.render('usuarios/index', {usuarios: users})
}

exports.login_post = async (req, res, next) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        res.render('index', {
            errors: { message: 'Favor de llenar ambos campos' },
        })
        return
    }
    
    const user = await Usuario.findOne({email: email})
    console.log(user)

    //Login
    if(!user) {
        res.render('index', {
            errors: { message: 'No existe ese usuario' },
        })
        return
    }

    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
        //Crear sesión y redireccionar a la parte segura de reserva de bicis:
        session = req.session
        session.userid = email
        console.log(req.session)
        res.redirect('/home')
        return
    } else {
        res.render('index', {
            errors: { message: 'Password incorrecto' },
        })
        return
    }
}

exports.update_get = function(req, res, next){
    Usuario.findById(req.params.id, function(err, usuario){
        res.render('usuarios/update', {errors:{}, usuario: usuario})
    })
}

exports.update = function(req, res, next){
    let update_values = {nombre: req.body.nombre}
    Usuario.findByIdAndUpdate(req.params.id, update_values, function(err, usuario){
        if(err) {
            console.log(err)
            res.render('usuario/update', {errors: err.errors, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email })})
        }
        else{
            res.redirect('/usuarios')
            return
        }
    })
}

exports.create_get = function(req, res, next){
    res.render('usuarios/create', { errors:{}, usuario: new Usuario() } )
}

exports.create = function(req, res, next){
    if(req.body.password != req.body.confirm_password){
        res.render('usuarios/create', {errors: {confirm_password: {message: 'No coinciden los passwords '}},  usuario: new Usuario({nombre: req.body.nombre, email: req.body.email }) })
        return
    }
    Usuario.create({ nombre: req.body.nombre, email: req.body.email, password: req.body.password }, function(err, nuevoUsuario) {
        if(err){
            res.render('usuarios/create', {errors: {email: {message: 'Ya existe un usuario con ese password'}}, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email })})
        }
        else{
            nuevoUsuario.enviar_mail_bienvenida()
            res.redirect('/usuarios')
        }
    })
}

exports.delete = function(req, res, next){
    Usuario.findByIdAndDelete(req.body.id, function(err){
        if(err)
            next(err)
        else
            res.redirect('/usuarios')
    })
}