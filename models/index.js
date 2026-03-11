import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config.js";

import UserModel from "./User.js";
import CategoryModel from "./category.js";
import BrandModel from "./brand.js";
import ProductModel from "./product.js";
import ProductImageModel from "./productimage.js";
import ProductVariantModel from "./productvariant.js";
import ProductReviewModel from "./productreview.js";
import CartModel from "./cart.js";
import CartItemModel from "./cartitem.js";
import OrderModel from "./order.js";
import OrderItemModel from "./orderitem.js";
import ShipmentModel from "./shipment.js";
import WishlistModel from "./wishlist.js";
import CouponModel from "./coupon.js";

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false
  }
);

const models = {
  User: UserModel(sequelize, DataTypes),
  Category: CategoryModel(sequelize, DataTypes),
  Brand: BrandModel(sequelize, DataTypes),
  Product: ProductModel(sequelize, DataTypes),
  ProductImage: ProductImageModel(sequelize, DataTypes),
  ProductVariant: ProductVariantModel(sequelize, DataTypes),
  ProductReview: ProductReviewModel(sequelize, DataTypes),
  Cart: CartModel(sequelize, DataTypes),
  CartItem: CartItemModel(sequelize, DataTypes),
  Order: OrderModel(sequelize, DataTypes),
  OrderItem: OrderItemModel(sequelize, DataTypes),
  Shipment: ShipmentModel(sequelize, DataTypes),
  Wishlist: WishlistModel(sequelize, DataTypes),
  Coupon: CouponModel(sequelize, DataTypes),
};

Object.values(models).forEach((model) => {
  if (model && typeof model.associate === "function") {
    model.associate(models);
  }
});

export { sequelize };
export default models;
