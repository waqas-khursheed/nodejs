export default (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      cart_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      product_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      product_variant_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      }
    },
    {
      tableName: "cart_items",
      underscored: true
    }
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: "cart_id" });
    CartItem.belongsTo(models.Product, { foreignKey: "product_id" });
    CartItem.belongsTo(models.ProductVariant, { foreignKey: "product_variant_id" });
  };

  return CartItem;
};
