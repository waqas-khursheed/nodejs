export default (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    "Wishlist",
    {
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      product_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      }
    },
    {
      tableName: "wishlists",
      underscored: true
    }
  );

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User, { foreignKey: "user_id" });
    Wishlist.belongsTo(models.Product, { foreignKey: "product_id" });
    models.User.hasMany(Wishlist, { foreignKey: "user_id" });
    models.Product.hasMany(Wishlist, { foreignKey: "product_id" });
  };

  return Wishlist;
};
