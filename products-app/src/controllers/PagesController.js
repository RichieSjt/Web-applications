let ProductModel = require('../models/Product')

exports.homepage = async (req, res) => {
    let products = await ProductModel.all()
    // Sending data to the view
    res.render('pages/homepage', { products: products })
}

exports.about = (req, res) => {
    res.render('pages/about')
}
