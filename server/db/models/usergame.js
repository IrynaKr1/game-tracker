'use strict';
const { Model } = require('sequelize');
const { GAME_STATUS, GAME_STATUS_LIST } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      rawgId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'rawg_id',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
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
