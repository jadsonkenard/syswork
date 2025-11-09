import bcrypt from "bcrypt"

"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const hashedPassword = await bcrypt.hash("jadsonpaim", 10);

  return queryInterface.bulkInsert("Users", [
    {
      full_name: "admin",
      cpf: "47765493019",
      phone: "87988554477",
      email: "admin@syswork.com",
      username: "admin",
      password: hashedPassword,
      role: "admin",
      position_id: 1,
      department_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("Users", { username: "admin" });
}
