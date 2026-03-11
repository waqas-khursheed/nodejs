export default (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define(
    "ProductVariant",
    {
      product_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      attributes: {
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      tableName: "product_variants",
      underscored: true
    }
  );

  ProductVariant.associate = (models) => {
    // Variant belongs to Product
    ProductVariant.belongsTo(models.Product, {
      foreignKey: "product_id"
    });
  };

  return ProductVariant;
};