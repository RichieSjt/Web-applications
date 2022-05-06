const Bicicleta = require('../models/bicicleta')
const Reserva = require('../models/reserva')
const Usuario = require('../models/usuario')

exports.bicicleta_list = function (req, res) {
    Bicicleta.find({}, function (err, bicis) {
        if (err) console.log(err)
        res.render('bicicletas/index', { bicis: bicis })
    })
}

exports.bicicleta_create_get = function (req, res) {
    res.render('bicicletas/create')
}

exports.bicicleta_create_post = async (req, res) => {
    const { id, color, modelo, lat, lon } = req.body
    
    const bici = {
        code: id, 
        color: color, 
        modelo: modelo, 
        ubicacion: [lat, lon]
    }

    await Bicicleta.create(bici)
    
    res.redirect('/bicicletas')
}

exports.bicicleta_delete_post = function (req, res) {
    Bicicleta.removeByCode(req.body.code).then(function(){
        res.redirect('/bicicletas')
    })
}

exports.bicicleta_update_get = function (req, res) {

    Bicicleta.findOne({ code: req.params.id }).then(function (bici) {
        res.render('bicicletas/update', { bici: bici })
    });
}

exports.bicicleta_update_post = function (req, res) {
    Bicicleta.findOne({ code: req.params.id }).then(function (bici) {
        bici.id = req.body.id
        bici.color = req.body.color
        bici.modelo = req.body.modelo
        bici.ubicacion = [req.body.lon, req.body.lat]
        bici.save()
        res.redirect('/bicicletas')
    });

} 

exports.bicicleta_reservar_get = async (req, res) => {
    const bicycles = await Bicicleta.find({})
    
    //Checar sesión
    session = req.session;
    if (session && session.userid) {

        const reservations = await Reserva.find({}).populate('bicicleta').populate('usuario').exec()

        console.log(reservations)
        res.render('bicicletas/reserve', { bicis: bicycles, uid: session.userid, reservas: reservations })
    } else {
        res.redirect('/')
    }
}

exports.bicicleta_reservar_post = async (req, res) => {
    //Encontrar al usuario que hará la reserva
    const user = await Usuario.findOne({ email: req.body.uid })

    //Encontrar la bicicleta que se reservará
    const bicycle = await Bicicleta.findByCode(req.body.code)

    //Hacer la reserva
    console.log('haciendo la reserva')
    let hoy = new Date()
    let mañana = new Date()
    mañana.setDate(hoy.getDate() + 1)

    await user.reservar(bicycle.id, hoy, mañana)

    Bicicleta.find({})

    //Checar sesión
    session = req.session
    if (session && session.userid) {
        res.redirect('reservar')
    } else {
        res.redirect('/')
    }
}