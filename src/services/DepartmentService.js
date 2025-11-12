import db from "../database/models/index.js";

const { Department, Position, Ticket } = db;

class DepartmentService {
  async getAll() {
    const department = await Department.findAll();

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

    await department.destroy();
    return { message: "Setor deletado com sucesso!." };
  }

  //BUSCA OS CHAMADOS SOLICITADOS POR SETOR
  async getTicketRequestedDepartment(id) {
    const department = await Department.findByPk(id, {
      include: [{ model: Ticket, as: "tickets_requested" }],
    });

    if (!department) {
      throw new Error("Setor não encontrado");
    }

    if (
      !department.tickets_requested ||
      department.tickets_requested.length === 0
    ) {
      throw new Error("Nenhum chamado aberto por este setor.");
    }

    return department;
  }

  //BUSCA OS CHAMADOS RECEBIDOS (SETOR EXECUTANTE)
  async getTicketExecutorDepartment(id) {
    const department = await Department.findByPk(id, {
      include: [{ model: Ticket, as: "tickets_executed" }],
    });

    if (!department) {
      throw new Error("Setor não encontrado.");
    }

    if (
      !department.tickets_executed ||
      department.tickets_executed.length === 0
    ) {
      throw new Error("Nenhum chamado aberto para este setor.");
    }

    return department;
  }

  //BUSCA CHAMADOS DO MEU SETOR
  async getTicketsMyDepartment(id) {
    const tickets = await this.getTicketExecutorDepartment(id);

    if (!tickets || tickets.length === 0) {
      throw new Error("Não foram encontrados chamados.");
    }

    return tickets;
  }
}

export default new DepartmentService();
