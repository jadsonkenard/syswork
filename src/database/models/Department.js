import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Department extends Model {
    static associate(models) {
      this.belongsTo(models.Position, {
        foreignKey: "position_id",
        as: "position",
      });

      this.hasMany(models.User, {
        foreignKey: "department_id",
        as: "users",
      });

      this.hasMany(models.Ticket, {
        foreignKey: "requester_department_id",
        as: "tickets_requested",
      });

      this.hasMany(models.Ticket, {
        foreignKey: "executor_department_id",
        as: "tickets_executed",
      });
    }
  }

  Department.init(
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
      position_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Department",
      tableName: "Departments",
      timestamps: true,
    }
  );
  return Department;
};
