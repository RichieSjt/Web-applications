var express = require('express')
var router = express.Router()
let bicycleController = require('../controllers/bicycleController')

// Listing bicycles
router.get('/', bicycleController.bicycle_list)

// Add new bicycle
router.get('/create', bicycleController.bicycle_create_get)
router.post('/create', bicycleController.bicycle_create_post)

// Delete bicycle
router.post('/:id/delete', bicycleController.bicycle_delete_post)

// Update bicycle
router.get('/:id/update', bicycleController.bicycle_update_get)
router.put('/:id/update', bicycleController.bicycle_update_put)

module.exports = router
