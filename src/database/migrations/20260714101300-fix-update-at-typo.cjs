'use strict';

// `stocks.update_at` and `web_settings.update_at` were both missing the "d"
// (should be `updated_at`), which meant Sequelize never mapped them and the
// ORM never saw the value. Renamed for consistency with every other table.
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE `stocks` CHANGE COLUMN `update_at` `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    );

    await queryInterface.sequelize.query(
      "ALTER TABLE `web_settings` CHANGE COLUMN `update_at` `updated_at` DATETIME NULL"
    );
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE `stocks` CHANGE COLUMN `updated_at` `update_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    );

    await queryInterface.sequelize.query(
      "ALTER TABLE `web_settings` CHANGE COLUMN `updated_at` `update_at` DATETIME NULL"
    );
  },
};
