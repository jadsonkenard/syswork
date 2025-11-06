import Position from "../database/models/Position.js";
import Departments from "../database/models/Department.js";
import { Op } from "sequelize";

class PositionService {
  async getAll() {
    const position = await Position.findAll();
    if (!position) throw new Error("Ocorreu um erro ao buscar funções.");

    if (position == 0) throw new Error("Não foram encontradas funções.");

    return position;
  }

  async store(data) {
    if (!data.name || data.name == "") {
      throw new Error("O nome precisa ser preenchido.");
    }
    if (data.salary <= 0) {
      throw new Error("O salario não poder ser 0 ou negativo");
    }
    if (!data.salary) {
      throw new Error("O salário precisa ser preenchido.");
    }

    return await Position.create(data);
  }

  async findById(id) {
    const position = await Position.findByPk(id);

    if (!position) {
      throw new Error("Função não encontrada.");
    }

    return position;
  }

  async update(id, data) {
    const position = await Position.findByPk(id);

    if (!position) {
      throw new Error("Função não encontrada.");
    }

    const dataToUpdate = {};
    let changesDetected = false;

    if (data.name !== undefined) {
      const newName = String(data.name).trim();
      const currentName = position.name.trim();

      if (newName !== currentName) {
        dataToUpdate.name = newName;
        changesDetected = true;
      }
    }

    if (data.name == "") {
      throw new Error("O nome não pode ser vazio.");
    }

    if (data.salary !== undefined) {
      const newSalary = Number(data.salary);
      const currentSalary = Number(position.salary);

      if (newSalary !== currentSalary) {
        dataToUpdate.salary = newSalary;
        changesDetected = true;
      }
    }

    if (data.salary === 0) {
      throw new Error("O salário não pode ser 0");
    }

    if (!changesDetected) {
      throw new Error(
        "Nenhuma alteração detectada. Os valores enviados são iguais aos atuais."
      );
    }

    await Position.update(dataToUpdate, { where: { id } });
    return Position.findByPk(id);
  }

  async delete(id) {
    const position = await Position.findByPk(id);

    if (!position) {
      throw new Error("Função não encontrada.");
    }

    //VERFICA SE EXISTE DEPARTAMENTO VINCULADO A FUNÇÃO A SER DELETADA
    const department = await Departments.findOne({
      where: {
        [Op.or]: [{ position_id: id }],
      },
    });

    if (department) {
      throw new Error(
        "Não foi possível excluir esta função. Esta função possui setores associados."
      );
    }

    await position.destroy();
    return { message: "Função deletada." };
  }
}

export default new PositionService();
