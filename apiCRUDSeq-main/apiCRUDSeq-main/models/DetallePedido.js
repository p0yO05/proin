"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DetallePedido extends Model {
    static associate(models) {
      DetallePedido.belongsTo(models.Pedido, { foreignKey: "pedidoFk", as: "pedido" });
      DetallePedido.belongsTo(models.Producto, { foreignKey: "productoFk", as: "productos" });
    }
  }

  DetallePedido.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      pedidoFk: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "pedido",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      productoFk: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "producto",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      precioUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "DetallePedido",
      tableName: "detalle_pedido",
      timestamps: true,
    }
  );

  return DetallePedido;
};
