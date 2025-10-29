import User from "../models/User.js";
import Department from "../models/Department.js";
import Position from "../models/Position.js";
import { validateCPF } from "../utils/validateCpf.js";

class UserService {
  async getAll() {
    const users = await User.findAll();

    if (!users) {
      throw new Error("Não foram encontrados usuários.");
    }

    if (users == 0) {
      throw new Error("Nenhum usuário cadastrado.");
    }

    return users;
  }

  async store(data) {
    const position = await Position.findByPk(data.position_id);
    const department = await Department.findByPk(data.department_id);
    const existingCPF = await User.findOne({ where: { cpf: data.cpf } });

    if (data.full_name === null || data.full_name === undefined) {
      throw new Error("O nome precisa ser informado.");
    }

    if (typeof data.full_name === "number") {
      throw new Error("Nome não pode ter números.");
    }
    const fullNameTreated = data.full_name.trim();

    if (fullNameTreated == "") {
      throw new Error("O nome não pode ser vazio.");
    }

    if (fullNameTreated.length <= 2) {
      throw new Error("O nome precisa ter pelo menos 3 caracteres.");
    }

    if (/[0-9]/.test(fullNameTreated)) {
      throw new Error("O nome não pode conter números.");
    }

    if (!validateCPF(data.cpf)) {
      throw new Error("CPF inválido.");
    }

    if (existingCPF) {
      throw new Error("CPF já cadastrado en outro usuário.");
    }

    if (!position) {
      throw new Error("Esta função não existe.");
    }
    if (!department) {
      throw new Error("Este setor não existe.");
    }

    await User.create(data);
    return { message: "Usuário criado com sucesso." };
  }
}

export default new UserService();
