import Position from "./Position.js";
import Departament from "./Departament.js";
import Ticket from "./Ticket.js";

// Uma função (Position) pode ter vários setores
Position.hasMany(Departament, {
  foreignKey: "position_id",
  as: "departaments",
});

// Um setor pertence a uma função
Departament.belongsTo(Position, {
  foreignKey: "position_id",
  as: "position",
});

// Um setor pode solicitar vários tickets
Departament.hasMany(Ticket, {
  foreignKey: "requester_department_id",
  as: "tickets_requested",
});

// Um setor pode executar vários tickets
Departament.hasMany(Ticket, {
  foreignKey: "executor_department_id",
  as: "tickets_executed",
});

// Cada ticket pertence a um setor solicitante
Ticket.belongsTo(Departament, {
  foreignKey: "requester_department_id",
  as: "requester_department",
});

// Cada ticket pertence a um setor executante
Ticket.belongsTo(Departament, {
  foreignKey: "executor_department_id",
  as: "executor_department",
});

export { Position, Departament, Ticket };
