"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("Tickets", "requester_user_id", {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    references: {
      model: "Users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("Tickets", "requester_user_id");
}
