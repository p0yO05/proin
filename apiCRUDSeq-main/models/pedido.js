"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Pedido extends Model {
        static associate(models) {
            Pedido.hasMany(models.DetallePedido, { foreignKey: "pedidoFk", as: "DetallePedido" })
        }
    }

    Pedido.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        cliente: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0
        },
    },
        {
            sequelize,
            modelName: "Pedido",
            tableName: "pedido",
            timestamps: true
        }

    );
    return Pedido;
}