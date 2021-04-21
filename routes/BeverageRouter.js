const express = require('express');
const router = express.Router()
const BeverageController = require('../controllers/BeverageController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate)
router.post('/beverages', authorize, BeverageController.addBeverage)
router.get('/beverages', authorize, BeverageController.findAllBeverage)
router.get('/beverages/:id', authorize, BeverageController.findOne)
router.put('/beverages/:id', authorize, BeverageController.editBeverage)
router.delete('/beverages/:id', authorize, BeverageController.deleteBeverage)

module.exports = router