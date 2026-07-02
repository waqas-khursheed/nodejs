import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class WebSetting extends Model {
  static associate(models) {}

}

WebSetting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    main_logo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    fav_icon: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    website_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    website_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    meta_keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(95),
      allowNull: true,
    },

    phone_one: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },

    phone_two: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },

    copyright: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    footer_widget_1: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },

    footer_widget_2: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },

    footer_widget_3: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },

    footer_widget_4: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },

    payment_logo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    service_for: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "both",
    },

    dynamic_module_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Brand",
    },

    delivery_days: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    delivery_start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    delivery_end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    min_amount_for_free_delivery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    shipping_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    location_mod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    delivery_days_time_mod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    footer_payment_logo_mod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "WebSetting",
    tableName: "web_settings",

    timestamps: false,
  }
);

export default WebSetting;
