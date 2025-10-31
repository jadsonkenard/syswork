export function validateStatus(status) {
  if (!status) throw new Error("O status precisa ser informado.");
  if (status !== "active" && status !== "inactive")
    throw new Error("Status inválido.");

  return status;
}
