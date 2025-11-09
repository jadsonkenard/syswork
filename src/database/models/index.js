import sequelize from "../../config/database.js";

import DepartmentModel from "./Department.js";
import PositionModel from "./Position.js";
import UserModel from "./User.js";
import TicketModel from "./Ticket.js";

const Department = DepartmentModel(sequelize);
const Position = PositionModel(sequelize);
const User = UserModel(sequelize);
const Ticket = TicketModel(sequelize);

const db = { Department, Position, User, Ticket, sequelize };

Object.values(db).forEach((model) => {
  if (model.associate) model.associate(db);
});

export default db;
