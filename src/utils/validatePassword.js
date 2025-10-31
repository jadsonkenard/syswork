import bcrypt from "bcrypt";

export async function validatePassword(password) {
  if (!password) throw new Error("A senha precisa ser informada.");

  if (password.length < 6)
    throw new Error("A senha deve ter pelo menos 6 caracteres.");

  const hash = await bcrypt.hash(password, 10);
  return hash;
}
