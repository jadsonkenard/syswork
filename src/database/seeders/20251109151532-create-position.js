"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert("Positions", [
    {
      name: "Técnico de Informática",
      salary: 5200,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("Positions", {
    name: "Técnico de Informática",
  });
}
