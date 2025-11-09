"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert("Departments", [
    {
      name: "Tecnologia da Informação. T.I",
      position_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("Departments", {
    name: "Tecnologia da Informação. T.I",
  });
}
