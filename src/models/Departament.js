import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Departament = sequelize.define("Departament", {
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
    allowNull: true,
    references: {
      model: "positions",
      key: "id",
    },
    field: "position_id",
  },
});

export default Departament;
