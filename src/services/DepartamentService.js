import Departament from "../models/Departament.js";
import Position from "../models/Position.js";
import Ticket from "../models/Ticket.js";

class DepartamentService {
  async getAll() {
    const departament = await Departament.findAll();

    if (!departament) throw new Error("Ocorreu um erro ao buscar setores.");

    if (departament == 0) throw new Error("Não foram encontrados setores.");

    return departament;
  }

  async store(data) {
    const positionExist = await Position.findByPk(data.position_id);

    if (!positionExist) {
      throw new Error("O ID da função que você tentou enviar não existe.");
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

    await Departament.create(data);
    return { message: "Setor criado com sucesso." };
  }

  async findById(id) {
    const departament = await Departament.findByPk(id);

    if (!departament) {
      throw new Error("Função não encontrada.");
    }

    return departament;
  }

  async update(id, data) {
    const departament = await Departament.findByPk(id);
    const positionId = await Position.findByPk(data.position_id);

    if (!departament) {
      throw new Error("Setor não encontrado.");
    }

    const dataToUpdate = {};
    let changesDetected = false;

    if (data.name !== undefined) {
      const newName = String(data.name).trim();
      const currentName = departament.name.trim();

      if (newName !== currentName) {
        dataToUpdate.name = newName;
        changesDetected = true;
      }
    }

    if (data.position_id !== undefined) {
      const newPositionId = Number(data.position_id);
      const currentPositionId = departament.position_id;

      if (newPositionId !== currentPositionId) {
        dataToUpdate.position_id = newPositionId;
        changesDetected = true;
      }
    }

    if (!positionId) {
      throw new Error("O ID da função que você tentou enviar não existe.");
    }

    if (!changesDetected) {
      throw new Error(
        "Nenhuma alteração detectada. Os valores enviados são iguais aos atuais."
      );
    }

    await Departament.update(dataToUpdate, { where: { id } });
    return Departament.findByPk(id);
  }

  async delete(id) {
    const departament = await Departament.findByPk(id);
    if (!departament) {
      throw new Error("Setor não encontrado.");
    }

    await departament.destroy();
    return { message: "Setor deletado com sucesso!." };
  }

  //BUSCA OS CHAMADOS SOLICITADOS POR SETOR
  async getTicketRequestedDepartment(id) {
    const departament = await Departament.findByPk(id, {
      include: [{ model: Ticket, as: "tickets_requested" }],
    });

    if (!departament) {
      throw new Error("Setor não encontrado");
    }

    return departament;
  }

  //BUSCA OS CHAMADOS RECEBIDOS (SETOR EXECUTANTE)
  async getTicketExecutorDepartment(id) {
    const departament = await Departament.findByPk(id, {
      include: [{ model: Ticket, as: "tickets_executed" }],
    });

    if (!departament) {
      throw new Error("Setor não encontrado");
    }

    return departament;
  }
}

export default new DepartamentService();
