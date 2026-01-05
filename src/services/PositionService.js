import db from "../database/models/index.js";

const { Position, Department } = db;

import { Op } from "sequelize";

class PositionService {
  async getAll(page = 1, limit = 20) {
    const offset = (page - 1) * limit;

    const { rows: positons, count: total } = await Position.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    if (positons === 0) {
      throw new Error("Nenhuma função encontrada.");
    }

    return {
      data: positons,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async store(data) {
    if (!data.name || data.name == "") {
      throw new Error("O nome precisa ser preenchido.");
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
    const department = await Department.findOne({
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
