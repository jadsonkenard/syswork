"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.removeColumn("Positions", "salary");
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn("Positions", "salary", {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  });
}
