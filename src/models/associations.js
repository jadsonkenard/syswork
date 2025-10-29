import Position from "./Position.js";
import Department from "./Department.js";
import Ticket from "./Ticket.js";
import User from "./User.js";

// Uma função só pde ter um setor
Position.belongsTo(Department, {
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
  foreignKey: "departament_id",
  as: "department_user",
});

//Um departamento pode ter vários usuários
Department.hasMany(User, {
  foreignKey: "departament_id",
  as: "department_users",
});

export { User, Position, Department, Ticket };
