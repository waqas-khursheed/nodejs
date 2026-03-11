export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      category_id: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      brand_id: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      discount_price: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: true
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "products",
      underscored: true
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category"
    });

    Product.belongsTo(models.Brand, {
      foreignKey: "brand_id",
      as: "brand"
    });

    Product.hasMany(models.ProductImage, {
      foreignKey: "product_id",
      as: "images"
    });

    Product.hasMany(models.ProductVariant, {
      foreignKey: "product_id",
      as: "variants"
    });

    Product.hasMany(models.ProductReview, {
      foreignKey: "product_id",
      as: "reviews"
    });

    Product.hasMany(models.OrderItem, {
      foreignKey: "product_id",
      as: "orderItems"
    });

    Product.hasMany(models.Wishlist, {
      foreignKey: "product_id",
      as: "wishlists"
    });

    Product.hasMany(models.CartItem, {
      foreignKey: "product_id",
      as: "cartItems"
    });
  };

  return Product;
};
