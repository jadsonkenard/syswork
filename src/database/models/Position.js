import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Position extends Model {
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: "position_id",
        as: "users",
      });

      this.hasMany(models.Department, {
        foreignKey: "position_id",
        as: "departments",
      });
    }
  }

  Position.init(
    {
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
    },
    {
      sequelize,
      modelName: "Position",
      tableName: "Positions",
      timestamps: true,
    }
  );
  return Position;
};
