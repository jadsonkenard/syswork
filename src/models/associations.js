import Position from "./Position.js";
import Departament from "./Departament.js";

Position.hasMany(Departament, {
  foreignKey: "position_id",
  as: "departaments",
});

Departament.belongsTo(Position, {
  foreignKey: "position_id",
  as: "position",
});

export { Position, Departament };
