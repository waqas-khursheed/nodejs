export default (sequelize, DataTypes) => {
  const Shipment = sequelize.define(
    "Shipment",
    {
      order_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      tracking_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      carrier: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("pending","shipped","in_transit","delivered","cancelled"),
        defaultValue: "pending"
      },
      shipped_at: DataTypes.DATE,
      delivered_at: DataTypes.DATE
    },
    {
      tableName: "shipments",
      underscored: true
    }
  );

  Shipment.associate = (models) => {
    Shipment.belongsTo(models.Order, { foreignKey: "order_id" });
    models.Order.hasOne(Shipment, { foreignKey: "order_id" });
  };

  return Shipment;
};
