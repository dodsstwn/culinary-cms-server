const { User } = require('../models');
const { verifyLogin } = require('../helpers/jwt');

const authenticate = (req, res, next) => {
  try {
    let { id, email } = verifyLogin(req.headers.access_token)
    
    User.findOne({
      where: { id, email }
    })
    .then(user => {
      if (user) {
        req.currentUser = { id: user.id, email: user.email }
        next()
      } else {
        throw new Error()
      }
    })
    .catch(err => {
      next({name: '401'})
    })
  } catch (error) {
    next({name: '401'})
  }
}

const authorize = (req, res, next) => {

    User.findByPk(req.currentUser.id)
    .then(data => {
      if (data && data.role === 'admin') {
        next()
      } else if (data && data.role !== 'admin') {
        next({name: '401'})
      }
    })
    .catch(err => {
      next({name: '401'})
    })
}

module.exports = {
  authenticate,
  authorize
}