const Bicycle = require('../models/bicycle')

exports.bicycle_list = async (req, res) => {
    const bicycles = await Bicycle.all()

    res.render('bicycles/index', { bicycles: bicycles })
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

exports.bicycle_update_get = async (req, res) => {
    const id = req.params.id
    const bicycle = await Bicycle.find(id)
    console.log(req.body)

    res.render('bicycles/update', { bicycle })
}

exports.bicycle_update_post = (req, res) => {
    

    res.redirect('/bicycles')
}
