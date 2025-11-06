import Position from "../database/models/Position.js";
import Department from "../database/models/Department.js";
import Ticket from "../database/models/Ticket.js";
import User from "../database/models/User.js";

// Uma função só pode ter um setor
Position.hasMany(Department, {
  foreignKey: "position_id",
  as: "departments_position",
});

// Um setor só pode ter uma função
Department.belongsTo(Position, {
  foreignKey: "position_id",
  as: "position_department",
});

//<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Um setor pode solicitar vários tickets
Department.hasMany(Ticket, {
  foreignKey: "requester_department_id",
  as: "tickets_requested",
});

// Um setor pode executar vários tickets
Department.hasMany(Ticket, {
  foreignKey: "executor_department_id",
  as: "tickets_executed",
});

// Cada ticket pertence a um setor solicitante
Ticket.belongsTo(Department, {
  foreignKey: "requester_department_id",
  as: "requester_department",
});

// Cada ticket pertence a um setor executante
Ticket.belongsTo(Department, {
  foreignKey: "executor_department_id",
  as: "executor_department",
});

//<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Um usuário só pode ter uma função
User.belongsTo(Position, {
  foreignKey: "position_id",
  as: "position_user",
});

//Uma função pode ter vários usuários
Position.hasMany(User, {
  foreignKey: "position_id",
  as: "position_users",
});

//Um usuário só pode pertencer a um setor
User.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department_user",
});

//Um departamento pode ter vários usuários
Department.hasMany(User, {
  foreignKey: "department_id",
  as: "department_users",
});

export { User, Position, Department, Ticket };
