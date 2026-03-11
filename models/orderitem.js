export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      product_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {
      tableName: "order_items",
      underscored: true
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: "order_id"
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: "product_id"
    });
  };

  return OrderItem;
};
