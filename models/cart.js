export default (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    },
    {
      tableName: "carts",
      underscored: true
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "user_id" });
    Cart.hasMany(models.CartItem, { foreignKey: "cart_id" });
  };

  return Cart;
};
