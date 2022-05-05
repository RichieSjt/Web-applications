let Bicicleta = require('../../models/bicicleta')

// exports.bicicleta_list = function(req, res){
//     res.status(200).json({
//         bicicletas: Bicicleta.allBicis
//     })
// }

exports.bicicleta_list = function(req, res){
    Bicicleta.find({}, function(err, bicis){
        res.status(200).json({
            bicicletas: bicis
        })
    })
}

exports.bicicleta_create = async (req, res) => {
    const { id, color, modelo, lat, lon } = req.body

    const bici = {
        code: id,
        color: color,
        modelo: modelo,
        ubicacion: [lat, lon],
    }

    await Bicicleta.create(bici)

    res.status(200).json({
        bicicleta: bici,
    })
}

exports.bicicleta_delete = function(req, res){
    Bicicleta.removeByCode(req.body.code)
    res.status(204).send()
}

