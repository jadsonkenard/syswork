export function validateRole(role) {
  const rolesPermitidos = ["admin", "user"];

  if (!role) {
    role = "user";
  }

  if (role && !rolesPermitidos.includes(role))
    throw new Error("Tipo de usuário inválido.");

  return role;
}
