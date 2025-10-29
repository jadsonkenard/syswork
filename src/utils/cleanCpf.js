export function cleanCPF(cpf) {
  if (!cpf) return "";
  // Remove qualquer caractere que não seja dígito
  return String(cpf).replace(/\D+/g, "");
}
