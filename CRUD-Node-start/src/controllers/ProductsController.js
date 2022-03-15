let ProductModel = require('../models/Product')

exports.create = (req, res) => {
    res.render('products/create')
}

// Store the product
exports.store = async (req, res) => {
    console.log(req.body)

    // Crea un objeto con la información del usuario
    let product = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    }
    console.log(product)
    // Crea el producto
    const id = await ProductModel.create(product)
    res.redirect('/')
}

// Show the product
exports.show = async (req, res) => {
    const id = req.params.id
    // Busca dentro de la base de datos el producto con el id indicado
    const product = await ProductModel.find(id)
    if (product == null) {
        res.status(404).send('Not found')
        return
    }
    // Si el producto existe entonces muestra la vista products/show.hbs
    // con la información del producto
    res.render('products/show', { product: product })
}

// Edit a product
exports.edit = async (req, res) => {
    // Obtiene el id que viene en la url
    let id = req.params.id
    // Busca dentro de la base de datos el producto con el id indicado
    const product = await ProductModel.find(id)

    // Si el producto no existe entonces
    if (product == null) {
        // Regresa el error 404
        res.status(404).send('Not found')
        return
    }
    // Si el producto existe entonces muestra la vista products/edit.hbs
    // con la información del producto
    res.render('products/edit', { product: product })
}