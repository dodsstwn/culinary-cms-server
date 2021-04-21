const express = require('express');
const router = express.Router()
const FoodController = require('../controllers/FoodController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate)
router.post('/foods', authorize, FoodController.addFood)
router.get('/foods', authorize, FoodController.findAllFood)
router.get('/foods/:id', authorize, FoodController.findOne)
router.put('/foods/:id', authorize, FoodController.editFood)
router.delete('/foods/:id', authorize, FoodController.deleteFood)

module.exports = router