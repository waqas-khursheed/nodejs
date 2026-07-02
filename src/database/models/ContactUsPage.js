import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ContactUsPage extends Model {
  static associate(models) {}

}

ContactUsPage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    map: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "ContactUsPage",
    tableName: "contact_us_page",

    timestamps: false,
  }
);

export default ContactUsPage;
