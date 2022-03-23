const Bicycle = require('../models/bicycle')

exports.bicycle_list = (req, res) => {
    res.render('bicycles/index', { bicycles: Bicycle.all })
}

exports.bicycle_create_get = (req, res) => {
    res.render('bicycles/create')
}

exports.bicycle_create_post = async (req, res) => {
    const { id, color, model, lat, lon } = req.body

    const bicycle = {
        id,
        color,
        model,
        lat, lon
    }

    await Bicycle.create(bicycle)

    res.redirect('/bicycles')
}

exports.bicycle_delete_post = (req, res) => {


    res.redirect('/bicycles')
}

exports.bicycle_update_get = (req, res) => {


    res.render('bicycles/update', { bici })
}

exports.bicycle_update_post = (req, res) => {
    

    res.redirect('/bicycles')
}