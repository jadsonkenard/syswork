import db from "../database/models/index.js";

const { User } = db;

export async function validateCPF(cpf) {
  if (!cpf) throw new Error("O CPF precisa ser informado.");

  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, "");

  // CPF precisa ter 11 dígitos
  if (cpf.length !== 11) throw new Error("O CPF precisa ter 11 dígitos.");

  // Rejeita CPFs com todos os dígitos iguais
  if (/^(\d)\1+$/.test(cpf)) throw new Error("CPF inválido.");

  // Validação dos dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) throw new Error("CPF inválido.");

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) throw new Error("CPF inválido.");

  const existingCPF = await User.findOne({ where: { cpf: cpf } });
  if (existingCPF) throw new Error("CPF já cadastrado.");

  return true;
}
