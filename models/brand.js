export default (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    },
    {
      tableName: "brands",
      underscored: true
    }
  );

  Brand.associate = (models) => {
    // Brand has many Products
    Brand.hasMany(models.Product, {
      foreignKey: "brand_id"
    });
  };

  return Brand;
};