'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.Quiz, {
        foreignKey: 'quiz_id',
        as: 'quiz'
      });
    }
  }

  Question.init(
    {
      question_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      answer: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      answers: {
        type: DataTypes.JSON, 
        allowNull: true,
        comment: 'Guardado como stringified JSON',
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quiz_id: {
        type: DataTypes.UUID,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'question',
      tableName: 'question',
      timestamps: true,
    }
  );

  return Question;
};
