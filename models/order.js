export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      order_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      payment_status: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        defaultValue: "pending"
      },
      order_status: {
        type: DataTypes.ENUM(
          "pending",
          "processing",
          "shipped",
          "delivered",
          "cancelled"
        ),
        defaultValue: "pending"
      }
    },
    {
      tableName: "orders",
      underscored: true
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: "user_id"
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: "order_id"
    });
  };

  return Order;
};
