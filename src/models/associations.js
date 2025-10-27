import Position from "./Position.js";
import Department from "./Department.js";
import Ticket from "./Ticket.js";

// Uma função (Position) pode ter vários setores
Position.hasMany(Department, {
  foreignKey: "position_id",
  as: "departaments",
});

// Um setor pertence a uma função
Department.belongsTo(Position, {
  foreignKey: "position_id",
  as: "position",
});

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

export { Position, Department, Ticket };
