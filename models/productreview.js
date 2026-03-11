export default (sequelize, DataTypes) => {
  const ProductReview = sequelize.define(
    "ProductReview",
    {
      product_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: DataTypes.TEXT,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    },
    {
      tableName: "product_reviews",
      underscored: true
    }
  );

  ProductReview.associate = (models) => {
    ProductReview.belongsTo(models.Product, {
      foreignKey: "product_id"
    });

    ProductReview.belongsTo(models.User, {
      foreignKey: "user_id"
    });

    models.Product.hasMany(ProductReview, {
      foreignKey: "product_id"
    });
  };

  return ProductReview;
};