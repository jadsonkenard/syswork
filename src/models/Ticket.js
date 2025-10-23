import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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
  departament_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "departaments",
      key: "id",
    },
    field: "departament_id",
  },
  status: {
    type: DataTypes.ENUM("open", "in progress", "done"),
    defaultValue: "open",
    allowNull: false,
  },
});

export default Ticket;
