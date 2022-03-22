let ProductModel = require('../models/Product')

exports.create = (req, res) => {
    res.render('products/create')
}

exports.store = async (req, res) => {
    // User info is contained in req object
    const product = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    }
    console.log(product)

    // Saving product
    const id = await ProductModel.create(product)
    res.redirect('/')
}

exports.show = async (req, res) => {
    const id = req.params.id

    const product = await ProductModel.find(id)

    if (product == null) {
        res.status(404).send('Not found')
        return
    }
    // If the product exists we go to the show view for that product
    res.render('products/show', { product: product })
}

exports.edit = async (req, res) => {
    let id = req.params.id

    const product = await ProductModel.find(id)

    if (product == null) {
        res.status(404).send('Not found')
        return
    }

    // If the product exists then we show the edit view for that product
    res.render('products/edit', { product: product })
}

exports.update = async (req, res) => {
    const id = req.params.id
    const product = await ProductModel.find(id)

    console.log(product)

    if (product == null) {
        res.status(404).send('Not found')
        return
    }

    // Updated product values
    const updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    }

    await ProductModel.update(product.id, updatedProduct)

    res.redirect('/')
}

exports.delete = async (req, res) => {
    let id = req.params.id

    const product = await ProductModel.find(id)

    if (product == null) {
        res.status(404).send('Not found')
        return
    }

    await ProductModel.delete(product.id)
    res.redirect('/')
}
