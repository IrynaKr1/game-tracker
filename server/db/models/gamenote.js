'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameNote extends Model {
    static associate (models) {
      GameNote.belongsTo(models.UserGame, {
        foreignKey: 'user_game_id',
        as: 'userGame',
      });
    }
  }

  GameNote.init(
    {
      userGameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_game_id',
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'GameNote',
    }
  );
  return GameNote;
};
