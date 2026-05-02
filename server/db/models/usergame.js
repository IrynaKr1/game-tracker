'use strict';
const { Model } = require('sequelize');
const { GAME_STATUS, GAME_STATUS_LIST } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      UserGame.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      UserGame.hasMany(models.GameNote, {
        foreignKey: 'user_game_id',
        as: 'notes',
      });
    }
  }
  UserGame.init(
    {
      userd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      rawgId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'rawg_id',
      },
      status: {
        type: DataTypes.ENUM(...GAME_STATUS_LIST),
        defaultValue: GAME_STATUS.NOT_STARTED,
      },
      rating: {
        type: DataTypes.DECIMAL(2, 1),
        validate: {
          min: 0,
          max: 5,
        },
      },
      playtime: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'UserGame',
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'rawg_id'],
        },
      ],
    }
  );
  return UserGame;
};
