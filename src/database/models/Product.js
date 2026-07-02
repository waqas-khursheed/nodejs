import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Product extends Model {
  static associate(models) {
    // ---- hasMany ----
    Product.hasMany(models.Stock, {
      foreignKey: "product_id",
      as: "stocks",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.Review, {
      foreignKey: "product_id",
      as: "reviews",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.ProductGallery, {
      foreignKey: "product_id",
      as: "productGalleries",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.ProductCity, {
      foreignKey: "product_id",
      as: "productCities",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.AssignAttrToProduct, {
      foreignKey: "product_id",
      as: "assignAttrToProducts",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.AssignCatToProduct, {
      foreignKey: "product_id",
      as: "assignCatToProducts",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.AssignTagToProduct, {
      foreignKey: "product_id",
      as: "assignTagToProducts",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.Wishlist, {
      foreignKey: "product_id",
      as: "wishlists",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.Cart, {
      foreignKey: "product_id",
      as: "carts",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.StockItem, {
      foreignKey: "product_id",
      as: "stockItems",
      onDelete: "CASCADE",
    });

    Product.hasMany(models.OrderDetail, {
      foreignKey: "product_id",
      as: "orderDetails",
      onDelete: "CASCADE",
    });

    // ---- belongsTo ----
    Product.belongsTo(models.Brand, {
      foreignKey: "brand_id",
      as: "brand",
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    short_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    long_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    features: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    inside_box: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },

    d_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    d_percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    dis_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    dis_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    sku: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    sold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    video_1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    video_2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    chart_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    featured_image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    hovered_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    featured_image_alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    featured_image_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    hovered_image_alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    hovered_image_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    size_chart_alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    size_chart_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    is_variation: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },

    is_prescription: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },

    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    new_arrival: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    best_seller: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    meta_keywords: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    meta_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "Product",
    tableName: "products",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Product;
