'use strict';
const { Model } = require('sequelize');
const { hashSync } = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.UserGame, {
        foreignKey: 'user_id',
        as: 'games',
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set (value) {
          this.setDataValue(
            'password',
            hashSync(value, Number(process.env.HASH_SALT))
          );
        },
      },
      username: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      modelName: 'User',
    }
  );
  return User;
};
