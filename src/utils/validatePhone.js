import User from "../models/User.js";

export async function validatePhone(phone) {
  if (phone === null || phone === undefined) {
    throw new Error("O telefone precisa ser informado.");
  }
  if (phone == "") {
    throw new Error("Telefone inválido.");
  }
  const phoneTreated = phone.replace(/[\s()-]/g, "");

  if (/\D/.test(phoneTreated)) {
    throw new Error("O telefone deve conter apenas números.");
  }

  if (phoneTreated && !/^[0-9]{10,11}$/.test(phoneTreated)) {
    throw new Error("Telefone deve ter 10 ou 11 dígitos");
  }

  const existingPhone = await User.findOne({ where: { phone: phone } });
  if (existingPhone) throw new Error("Telefone já cadastrado.");

  return true;
}
