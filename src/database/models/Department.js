import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Position from "./Position.js";

const Department = sequelize.define("Department", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Position,
      key: "id",
    },
  },
});

export default Department;
