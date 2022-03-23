var express = require('express')
var router = express.Router()
let bicicletaController = require('../controllers/bicicleta')

// Listing bicycles
router.get('/', bicicletaController.bicicleta_list)

// Add new bicycle
router.get('/create', bicicletaController.bicicleta_create_get)
router.post('/create', bicicletaController.bicicleta_create_post)

// Delete bicycle
router.post('/:id/delete', bicicletaController.bicicleta_delete_post)

// Update bicycle
router.get('/:id/update', bicicletaController.bicicleta_update_get)
router.post('/:id/update', bicicletaController.bicicleta_update_post)

module.exports = router
