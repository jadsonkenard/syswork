import { ForeignKeyConstraintError } from "sequelize";
import db from "../database/models/index.js";

const { Department, Position, Ticket, User } = db;

class DepartmentService {
  async getAll() {
    const department = await Department.findAll({
      include: [
        {
          model: Position,
          as: "position",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!department) throw new Error("Ocorreu um erro ao buscar setores.");

    if (department == 0) throw new Error("Não foram encontrados setores.");

    return department;
  }

  async store(data) {
    const positionExist = await Position.findByPk(data.position_id);

    if (!positionExist) {
      throw new Error(
        "O ID da função que você tentou enviar não existe ou ainda não foi criada."
      );
    }

    if (data.name == "") {
      throw new Error("O nome do setor não pode ser vazio.");
    }

    if (!data.name) {
      throw new Error("O nome do setor precisa ser informado.");
    }

    if (!data.position_id) {
      throw new Error("O ID da função para este setor precisa ser informado.");
    }

    await Department.create(data);
    return { message: "Setor criado com sucesso." };
  }

  async findById(id) {
    const department = await Department.findByPk(id);

    if (!department) {
      throw new Error("Setor não encontrado.");
    }

    return department;
  }

  async update(id, data) {
    const department = await Department.findByPk(id);
    const positionId = await Position.findByPk(data.position_id);

    if (!department) {
      throw new Error("Setor não encontrado.");
    }

    const dataToUpdate = {};
    let changesDetected = false;

    if (data.name !== undefined) {
      const newName = String(data.name).trim();
      const currentName = department.name.trim();

      if (newName !== currentName) {
        dataToUpdate.name = newName;
        changesDetected = true;
      }
    }

    if (data.position_id !== undefined) {
      if (!positionId) {
        throw new Error("O ID da função que você tentou enviar não existe.");
      }

      const newPositionId = Number(data.position_id);
      const currentPositionId = department.position_id;

      if (newPositionId !== currentPositionId) {
        dataToUpdate.position_id = newPositionId;
        changesDetected = true;
      }
    }

    if (!changesDetected) {
      throw new Error(
        "Nenhuma alteração detectada. Os valores enviados são iguais aos atuais."
      );
    }

    await Department.update(dataToUpdate, { where: { id } });
    return Department.findByPk(id);
  }

  async delete(id) {
    const department = await Department.findByPk(id);
    if (!department) {
      throw new Error("Setor não encontrado.");
    }

    try {
      await department.destroy();
      return { message: "Setor deletado com sucesso!" };
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) {
        throw new Error(
          "Não é possível excluir este setor porque existem chamados vinculados a ele."
        );
      }

      throw error;
    }
  }

  //BUSCA OS CHAMADOS SOLICITADOS POR SETOR
  async getTicketRequestedDepartment(id, page = 1, limit = 20) {
    const department = await Department.findByPk(id);

    if (!department) {
      throw new Error("Setor não encontrado.");
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Ticket.findAndCountAll({
      where: { requester_department_id: id },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Department,
          as: "requester_department",
          attributes: ["id", "name"],
        },
        {
          model: Department,
          as: "executor_department",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "requester_user",
          attributes: ["id", "username"],
        },
      ],
    });

    if (count === 0) {
      throw new Error("Nenhum chamado aberto por este setor.");
    }

    return {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit),
      data: rows,
    };
  }

  //BUSCA OS CHAMADOS RECEBIDOS (SETOR EXECUTANTE)
  async getTicketExecutorDepartment(id, page = 1, limit = 20) {
    const department = await Department.findByPk(id);

    if (!department) {
      throw new Error("Setor não encontrado.");
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Ticket.findAndCountAll({
      where: { executor_department_id: id },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Department,
          as: "requester_department",
          attributes: ["id", "name"],
        },
        {
          model: Department,
          as: "executor_department",
          attributes: ["id", "name"],
        },
        {
          model: User,
          as: "requester_user",
          attributes: ["id", "username"],
        },
      ],
    });

    if (count === 0) {
      throw new Error("Nenhum chamado aberto para este setor.");
    }

    return {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit),
      data: rows,
    };
  }

  //BUSCA CHAMADOS DIRECIONADOS PARA O MEU SETOR
  async getTicketsMyDepartment(id, page = 1, limit = 20) {
    const tickets = await this.getTicketExecutorDepartment(id, page, limit);

    if (!tickets || tickets.length === 0) {
      throw new Error("Não foram encontrados chamados.");
    }

    return tickets;
  }

  //BUSCA CHAMADOS ABERTOS PELO MEU SETOR
  async getTicketsToDepartment(id) {
    const tickets = await this.getTicketRequestedDepartment(id);

    if (!tickets || tickets.length === 0) {
      throw new Error("Não foram encontrados chamados.");
    }
    return tickets;
  }
}

export default new DepartmentService();
