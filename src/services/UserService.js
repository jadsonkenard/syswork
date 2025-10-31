import User from "../models/User.js";
import Department from "../models/Department.js";
import Position from "../models/Position.js";
import { validateCPF } from "../utils/validateCpf.js";
import { validateFullName } from "../utils/validateFullName.js";
import { validatePhone } from "../utils/validatePhone.js";
import { validateUsername } from "../utils/validateUsername.js";
import { validateEmail } from "../utils/validadeEmail.js";
import { validatePassword } from "../utils/validatePassword.js";

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
  //PHONE - FEITO
  //EMAIL - FEITO
  //USERNAME - FEITO
  //PASSWORD - <<<<<<
  //ROLE
  //POSITION_ID
  //DEPARTMENT_ID
  //STATUS

  async store(data) {
    const position = await Position.findByPk(data.position_id);
    const department = await Department.findByPk(data.department_id);

    validateFullName(data.full_name);

    if (await validateCPF(data.cpf));

    await validatePhone(data.phone);

    await validateEmail(data.email);

    await validateUsername(data.username);

    const hashedPassword = await validatePassword(data.password);

    if (!position) {
      throw new Error("Esta função não existe.");
    }

    if (!department) {
      throw new Error("Este setor não existe.");
    }

    data.password = hashedPassword;

    await User.create({
      ...data,
      password: hashedPassword,
    });
    
    return { message: "Usuário criado com sucesso." };
  }
}

export default new UserService();
