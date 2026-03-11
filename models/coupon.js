export default (sequelize, DataTypes) => {
  const Coupon = sequelize.define(
    "Coupon",
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      type: {
        type: DataTypes.ENUM("fixed","percentage"),
        defaultValue: "fixed"
      },
      value: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      min_purchase: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
      },
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
      }
    },
    {
      tableName: "coupons",
      underscored: true
    }
  );

  return Coupon;
};