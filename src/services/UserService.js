import User from "../models/User.js";
import Department from "../models/Department.js";
import Position from "../models/Position.js";
import { validateCPF } from "../utils/validateCpf.js";
import { validateFullName } from "../utils/validateFullName.js";
import { validatePhone } from "../utils/validatePhone.js";

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

  //>>>>>VALIDAÇÃO DO USUÁRIO<<<<<<
  //FULL_NAME - FEITO
  //CPF - FEITO
  //PHONE
  //USERNAME
  //PASSWORD
  //ROLE
  //POSITION_ID
  //DEPARTMENT_ID
  //STATUS

  async store(data) {
    const position = await Position.findByPk(data.position_id);
    const department = await Department.findByPk(data.department_id);
    const existingCPF = await User.findOne({ where: { cpf: data.cpf } });

    if (data.full_name === null || data.full_name === undefined) {
      throw new Error("O nome precisa ser informado.");
    }

    validateFullName(data.full_name);

    if (!validateCPF(data.cpf)) {
      throw new Error("CPF inválido.");
    }

    if (existingCPF) {
      throw new Error("CPF já cadastrado en outro usuário.");
    }

    if (data.phone === null || data.phone === undefined) {
      throw new Error("O telefone precisa ser informado.");
    }

    validatePhone(data.phone);

    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
