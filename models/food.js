'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.Category)
    }
  };
  Food.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required'
        },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Url of the image is required'
        },
        isUrl: {
          args: true,
          msg: 'Url type is wrong'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Price must be number'
        },
        min: {
          args: [0],
          msg: 'The price cannot be below 0'
        }

      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock is required'
        },
        isInt: {
          args: true,
          msg: 'Stock must be number'
        },
        min: {
          args: [0],
          msg: 'Stock must be required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'CategoryId is required'
        },
        isInt: {
          args: true,
          msg: 'CategoryId must be number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};