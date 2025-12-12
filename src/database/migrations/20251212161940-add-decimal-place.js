"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn("Positions", "salary", {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn("Positions", "salary", {
    type: Sequelize.STRING(1000),
    allowNull: false,
  });
}
