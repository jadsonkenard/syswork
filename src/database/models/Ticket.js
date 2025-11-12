import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.Department, {
        foreignKey: "requester_department_id",
        as: "requester_department",
      });

      this.belongsTo(models.Department, {
        foreignKey: "executor_department_id",
        as: "executor_department",
      });

      this.belongsTo(models.User, {
        foreignKey: "requester_user_id",
        as: "requester_user",
      });
    }
  }

  Ticket.init(
    {
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
      status: {
        type: DataTypes.ENUM("open", "in progress", "done"),
        defaultValue: "open",
        allowNull: false,
      },
      requester_department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      executor_department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Ticket",
      tableName: "Tickets",
      timestamps: true,
    }
  );

  return Ticket;
};
