export function validateFullName(fullName) {
  if (typeof fullName === "number") {
    throw new Error("Nome não pode ter números.");
  }
  const fullNameTreated = fullName.trim();

  if (fullNameTreated == "") {
    throw new Error("O nome não pode ser vazio.");
  }

  if (fullNameTreated.length <= 2) {
    throw new Error("O nome precisa ter pelo menos 3 caracteres.");
  }

  if (/[0-9]/.test(fullNameTreated)) {
    throw new Error("O nome não pode conter números.");
  }

  return true;
}
