export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      parent_id: {
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
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    },
    {
      tableName: "categories",
      underscored: true
    }
  );

  Category.associate = (models) => {
    Category.belongsTo(models.Category, {
      as: "parent",
      foreignKey: "parent_id"
    });

    Category.hasMany(models.Category, {
      as: "children",
      foreignKey: "parent_id"
    });

    Category.hasMany(models.Product, {
      foreignKey: "category_id"
    });
  };

  return Category;
};
