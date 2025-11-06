import User from "../database/models/User.js";

export async function validateEmail(email) {
  if (email == "") throw new Error("O email precisa ser informado.");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Email inválido.");

  const existingEmail = await User.findOne({ where: { email: email } });
  if (existingEmail) throw new Error("Este Email já está sendo usado.");
}
