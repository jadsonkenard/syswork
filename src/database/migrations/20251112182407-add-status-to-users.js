"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("Users", "status", {
    type: Sequelize.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "active",
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("Users", "status");
}
