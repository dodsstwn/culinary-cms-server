const express = require('express');
const router = express.Router()
const userRouter = require('./UserRouter');
const foodRouter = require('./FoodRouter');
const beverageRouter = require('./BeverageRouter');

router.use('/user', userRouter)
router.use('/', foodRouter)
router.use('/', beverageRouter)

module.exports = router