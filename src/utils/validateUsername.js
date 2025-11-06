import User from "../database/models/User.js";

export async function validateUsername(username) {
  if (!username) throw new Error("O nome de usuário precisa ser informado.");

  if (username.length <= 2)
    throw new Error("O nome de usuário precisa ter pelo menos 3 caracteres.");

  if (/[0-9]/.test(username))
    throw new Error("O nome de usuário não pode conter números.");

  if (username !== username.toLowerCase())
    throw new Error("O nome de usuário deve conter apenas letras minúsculas.");

  const existingUsername = await User.findOne({
    where: { username: username },
  });

  if (existingUsername)
    throw new Error("Este nome de usuário já está sendo usado.");
}
