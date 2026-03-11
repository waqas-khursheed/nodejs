export default (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "ProductImage",
    {
      product_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "product_images",
      underscored: true
    }
  );

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: "product_id"
    });
  };

  return ProductImage;
};
