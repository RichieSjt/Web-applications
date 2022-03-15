let ProductModel = require('../models/Product')

exports.homepage = async (req, res) => {
    let products = await ProductModel.all()
    // Enviamos los datos a la vista
    res.render('pages/homepage', { products: products })
}

exports.about = (req, res) => {
    res.render('pages/about')
}