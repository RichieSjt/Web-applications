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

exports.bicycle_delete_post = async (req, res) => {
    let id = req.params.id

    const bicycle = await Bicycle.find(id)

    if (bicycle == null) {
        res.status(404).send('Not found')
        return
    }

    await Bicycle.delete(bicycle.id)
    res.redirect('/bicycles')
}

exports.bicycle_update_get = async (req, res) => {
    const id = req.params.id
    const bicycle = await Bicycle.find(id)

    if (bicycle == null) {
        res.status(404).send('Not found')
        return
    }

    res.render('bicycles/update', { bicycle })
}

exports.bicycle_update_put = async (req, res) => {
    const { id, color, model, lat, lon } = req.body

    const updatedBicycle = {
        id,
        color,
        model,
        lat,
        lon,
    }

    await Bicycle.update(id, updatedBicycle)

    res.redirect('/bicycles')
}
