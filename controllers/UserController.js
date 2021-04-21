const { User } = require('../models');
const { comparePassword } = require('../helpers/password-helper');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static signIn(req, res, next) {
    // res.status(200).json({msg: 'Succeed!'})
    let data = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {email: data.email}
    })
    .then(user => {
      if (user) {
        const comparedPassword = comparePassword(data.password, user.password)
        
        if (comparedPassword) {
          let name = user.email.split('@')[0]
          name = name[0].toUpperCase() + name.substring(1)

          const access_token = generateToken({id: user.id, email: user.email, name})
          res.status(200).json({ id: user.id, name: name, email: user.email, access_token })
          // res.status(200).json(user)

        } else {
          next({name: '401'})
        }
      } else {
        next({name: '400'})
      }
    })
    .catch(err => {
      console.log(err)

      if(err.message === 'Invalid email or password') {
        next({name: '400'})
      } else {
        next({name: '500'})
      }
    })
  }
}

module.exports = UserController