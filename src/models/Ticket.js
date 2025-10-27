import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Department from "./Department.js";

const Ticket = sequelize.define("Ticket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  requester_department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: "id",
    },
  },
  executor_department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("open", "in progress", "done"),
    defaultValue: "open",
    allowNull: false,
  },
});

export default Ticket;
