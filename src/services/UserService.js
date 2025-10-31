import User from "../models/User.js";
import Department from "../models/Department.js";
import Position from "../models/Position.js";
import bcrypt from "bcrypt";
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

    const status = validateStatus(data.status);

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

  async update(id, data) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const dataToUpdate = {};
    let changesDetected = false;

    if (data.full_name !== undefined) {
      validateFullName(data.full_name);
      const newFullname = String(data.full_name).trim();
      const currentFullname = user.full_name.trim();

      if (newFullname !== currentFullname) {
        dataToUpdate.full_name = newFullname;
        changesDetected = true;
      }
    }

    if (data.cpf !== undefined) {
      if (await validateCPF(data.cpf));
      const newCpf = String(data.cpf).trim();
      const currentCpf = user.cpf.trim();

      if (newCpf !== currentCpf) {
        dataToUpdate.cpf = newCpf;
        changesDetected = true;
      }
    }

    if (data.phone !== undefined) {
      await validatePhone(data.phone);
      const newPhone = String(data.phone).trim();
      const currentPhone = user.phone.trim();

      if (newPhone !== currentPhone) {
        dataToUpdate.phone = newPhone;
        changesDetected = true;
      }
    }

    if (data.email !== undefined) {
      await validateEmail(data.email);
      const newEmail = String(data.email).trim();
      const currentEmail = user.email.trim();

      if (newEmail !== currentEmail) {
        dataToUpdate.email = newEmail;
        changesDetected = true;
      }
    }

    if (data.username !== undefined) {
      await validateUsername(data.username);
      const newUsername = String(data.username).trim();
      const currentUsername = user.username.trim();

      if (newUsername !== currentUsername) {
        dataToUpdate.username = newUsername;
        changesDetected = true;
      }
    }

    if (data.role !== undefined) {
      validateRole(data.role);
      const newRole = String(data.role).trim();
      const currentRole = user.role.trim();

      if (newRole !== currentRole) {
        dataToUpdate.role = newRole;
        changesDetected = true;
      }
    }

    if (data.position_id !== undefined) {
      const position = await Position.findByPk(data.position_id);
      if (!position) throw new Error("Esta função não existe.");

      const newPositionId = data.position_id;
      const currentPositionId = user.position_id;

      if (newPositionId !== currentPositionId) {
        dataToUpdate.position_id = newPositionId;
        changesDetected = true;
      }
    }

    if (data.department_id !== undefined) {
      const department = await Department.findByPk(data.department_id);
      if (!department) throw new Error("Este setor  não existe.");

      const newDepartmentId = data.department_id;
      const currentDepartmentId = user.department_id;

      if (newDepartmentId !== currentDepartmentId) {
        dataToUpdate.department_id = newDepartmentId;
        changesDetected = true;
      }
    }

    if (data.status !== undefined) {
      validateStatus(data.status);
      const newStatus = String(data.status).trim();
      const currentStatus = user.status.trim();

      if (newStatus !== currentStatus) {
        dataToUpdate.status = newStatus;
        changesDetected = true;
      }
    }

    if (!changesDetected) {
      throw new Error("Nenhuma alteração detectada.");
    }

    await User.update(data, { where: { id } });
    return User.findByPk(id, {
      attributes: { exclude: "password" },
    });
  }

  async updatePassword(id, data) {
    const user = await User.findByPk(id);

    if (!user) throw new Error("Usuário não encontrado.");

    if (data.password) {
      const isSame = await bcrypt.compare(data.password, user.password);

      if (isSame) {
        throw new Error("A nova senha não pode ser igual à senha atual.");
      }

      data.password = await validatePassword(data.password);
    } else {
      delete data.password;
    }

    await User.update(data, { where: { id } });
    return { message: "Senha atualizada com sucesso." };
  }
}

export default new UserService();
