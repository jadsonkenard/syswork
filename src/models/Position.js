import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Position = sequelize.define("Position", {
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
  salary: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

export default Position;
