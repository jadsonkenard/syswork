//
import db from "../database/models/index.js";

const { User } = db;

export async function validateAndNormalizeCPF(rawCpf) {
  if (!rawCpf) {
    throw new Error("O CPF precisa ser informado.");
  }

  // Normaliza (remove tudo que não for número)
  const cpf = rawCpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    throw new Error("O CPF precisa ter 11 dígitos.");
  }

  // Rejeita CPFs com todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    throw new Error("CPF inválido.");
  }

  // Validação dos dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(cpf[i]) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  if (resto !== Number(cpf[9])) {
    throw new Error("CPF inválido.");
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(cpf[i]) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  if (resto !== Number(cpf[10])) {
    throw new Error("CPF inválido.");
  }

  // Unicidade no banco
  const existingCPF = await User.findOne({ where: { cpf } });
  if (existingCPF) {
    throw new Error("CPF já cadastrado.");
  }

  // 🔥 Retorna CPF NORMALIZADO
  return cpf;
}
