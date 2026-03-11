module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("coupons", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      type: {
        type: Sequelize.ENUM("fixed","percentage"),
        allowNull: false,
        defaultValue: "fixed"
      },
      value: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      min_purchase: {
        type: Sequelize.DECIMAL(10,2),
        defaultValue: 0
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("coupons");
  }
};
