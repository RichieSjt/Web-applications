

const Usuario = require('../models/usuario')

exports.list = async (req, res, next) => {
    const users = await Usuario.find({})
    res.render('usuarios/index', {usuarios: users})
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