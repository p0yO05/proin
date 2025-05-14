'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Quiz extends Model {
    static associate(models) {
      /*Quiz.hasMany(models.Question, {
        foreignKey: 'quiz_id',
        as: 'questions'
      });*/
    }
  }

  Quiz.init(
    {
      quiz_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'quiz',
      tableName: 'quiz',
      timestamps: true,
    }
  );

  return Quiz;
};
