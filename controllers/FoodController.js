const { Food, Category } = require('../models');

class FoodController {
	static addFood(req, res, next){
		// res.status(200).json({msg: 'Succeed!'})
		let newFood = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }

    Food.create(newFood)
			.then(data => {
				res.status(201).json({success: 'Success to add new food!', data})
			})
			.catch(err => {
				// console.log(err.errors[0].message)
				const errorMessage = err.errors[0].message
				if (errorMessage) {
					next({name: '400'})
				} else {
					next({name: '500'})
				}
			})
	}

	static findAllFood(req, res, next) {
		Category.findAll({
      include: [{
        model: Food
      }]
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
			console.log(err)
      next({name : '500'})
    })
	}

	static findOne(req, res, next){
		let id = +req.params.id

    Food.findOne({
      where: {id}
    })
			.then(data => {
				if (data === null) {
					throw err
				} else {
					res.status(200).json(data)
				}
			})
			.catch(err => {
				next({name : '404'})
			})
	}

	static editFood(req, res, next) {
    let id = +req.params.id

    let newFood = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }

    Food.update(newFood, {
      where: {id},
      returning: true
    })
    .then(data => {
      res.status(200).json(data[1][0])
    })
    .catch(err => {
      console.log(err)
      const errorMessage = err.errors[0].message
      if (errorMessage) {
        next({name: '400'})
      } else {
        next({name: '500'})
      }
    })
  }

  static deleteFood(req, res, next) {
    let id = +req.params.id

    Food.destroy({
      where: {id}
    })
    .then(data => {
      if (data === null) {
        next({name: '404'})
      }
      res.status(200).json({message: 'Food success to delete'})
    })
    .catch(err => {
      next({name : '500'})
    })
  }
}

module.exports = FoodController