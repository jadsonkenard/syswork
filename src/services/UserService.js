import User from "../models/User.js";
import Department from "../models/Department.js";
import Position from "../models/Position.js";
import { validateCPF } from "../utils/validateCpf.js";
import { validateFullName } from "../utils/validateFullName.js";
import { validatePhone } from "../utils/validatePhone.js";
import { validateUsername } from "../utils/validateUsername.js";
import { validateEmail } from "../utils/validadeEmail.js";
import { validatePassword } from "../utils/validatePassword.js";
import { validateRole } from "../utils/validateRole.js";
import { validateStatus } from "../utils/validateStatus.js";

class UserService {
  async getAll() {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

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

    validateFullName(data.full_name);

    if (await validateCPF(data.cpf));

    await validatePhone(data.phone);

    await validateEmail(data.email);

    await validateUsername(data.username);

    const hashedPassword = await validatePassword(data.password);

    const role = validateRole(data.role);

    const status = await validateStatus(data.status);

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
      role: role,
      status: status,
    });

    return { message: "Usuário criado com sucesso." };
  }

  async findById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }
}

export default new UserService();
