const { Beverage } = require('../models');

class BeverageController {
  static addBeverage(req, res, next){
		// res.status(200).json({msg: 'Succeed!'})
		let newBeverage = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Beverage.create(newBeverage)
			.then(data => {
				res.status(201).json({success: 'Success to add new beverage!', data})
			})
			.catch(err => {
				// console.log(err.errors[0].message)
				const errorMessage = err.errors[0].message
				if (errorMessage) {
					next({name: '400'})
				} else {
          console.log(err)
					next({name: '500'})
				}
			})
	}

	static findAllBeverage(req, res, next) {
		// res.status(200).json({msg: 'Succeed!'})
		Beverage.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next({name : '500'})
      })
	}

	static findOne(req, res, next){
		// res.status(200).json({msg: 'Succeed!'})

		let id = +req.params.id

    Beverage.findOne({
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

	static editBeverage(req, res, next) {
		// res.status(200).json({msg: 'Succeed!'})

    let id = +req.params.id

    let newBeverage = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }

    Beverage.update(newBeverage, {
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

  static deleteBeverage(req, res, next) {
		// res.status(200).json({msg: 'Succeed!'})

    let id = +req.params.id

    Beverage.destroy({
      where: {id}
    })
    .then(data => {
      if (data === null) {
        next({name: '404'})
      }
      res.status(200).json({message: 'Beverage success to delete'})
    })
    .catch(err => {
      next({name : '500'})
    })
  }
}

module.exports = BeverageController