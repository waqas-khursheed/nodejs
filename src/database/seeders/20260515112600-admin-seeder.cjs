'use strict';

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // =========================
    // CHECK IF ADMIN EXISTS
    // =========================
    const [existing] = await queryInterface.sequelize.query(
      "SELECT * FROM admins WHERE email = 'superadmin@admin.com' LIMIT 1;"
    );

    if (existing.length > 0) {
      console.log("Super Admin already exists");
      return;
    }

    // =========================
    // HASH PASSWORD
    // =========================
    const hashedPassword = await bcrypt.hash("password", 10);

    // =========================
    // INSERT ADMIN
    // =========================
    await queryInterface.bulkInsert("admins", [
      {
        name: "Super Admin",
        email: "superadmin@admin.com",
        password: hashedPassword,
        is_admin: 1,
      },
    ]);

    console.log("Super Admin Created Successfully");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", {
      email: "admin@gmail.com",
    });
  },
};