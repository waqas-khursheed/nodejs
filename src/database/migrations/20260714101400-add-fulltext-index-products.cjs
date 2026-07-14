'use strict';

// Product search was a leading-wildcard LIKE '%term%', which can't use any
// index. A FULLTEXT index lets the search query use MATCH ... AGAINST instead.
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE `products` ADD FULLTEXT INDEX `products_fulltext_search` (`title`, `short_desc`)"
    );
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE `products` DROP INDEX `products_fulltext_search`"
    );
  },
};
