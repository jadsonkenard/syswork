import Ticket from "../models/Ticket.js";
import Departament from "../models/Departament.js";

class TicketService {
  async getAll() {
    const tickets = await Ticket.findAll();

    return tickets;
  }

  async store(data) {
    const requesterDepartmentIdExists = await Departament.findByPk(
      data.requester_department_id
    );
    const executorDepartmentIdExists = await Departament.findByPk(
      data.executor_department_id
    );
    if (!data.title) {
      throw new Error("O Título do chamado precisa ser informado.");
    }

    if (!data.description) {
      throw new Error("A descrição do chamado precisa ser informado.");
    }

    if (!requesterDepartmentIdExists) {
      throw new Error(
        "O ID do departamento solicitante que você está tentado enviar não existe."
      );
    }
    if (!executorDepartmentIdExists) {
      throw new Error(
        "O ID do departamento executante que você está tentado enviar não existe."
      );
    }

    await Ticket.create(data);
    return { message: "Chamado criado com sucesso." };
  }

  async findById(id) {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      throw new Error("Chamado não encontrad0.");
    }

    return ticket;
  }

  //ATUALIZA UM CHAMADO POR COMPLETO
  async update(id, data) {
    const ticket = await Ticket.findByPk(id);
    const requesterDepartmentIdExists = await Departament.findByPk(
      data.requester_department_id
    );
    const executorDepartmentIdExists = await Departament.findByPk(
      data.executor_department_id
    );

    if (!ticket) {
      throw new Error("Chamado não encontrado.");
    }

    const dataToUpdate = {};
    let changesDetected = false;

    if (data.title !== undefined) {
      const newTitle = String(data.title).trim();
      const currentTitle = ticket.title.trim();

      if (newTitle !== currentTitle) {
        dataToUpdate.title = newTitle;
        changesDetected = true;
      }
    }

    if (data.description !== undefined) {
      const newDescription = String(data.description).trim();
      const currentDescription = ticket.description.trim();

      if (newDescription !== currentDescription) {
        dataToUpdate.description = newDescription;
        changesDetected = true;
      }
    }

    if (data.requester_department_id !== undefined) {
      const newRequester_department_id = Number(data.requester_department_id);
      const currentRequester_department_id = Number(
        ticket.requester_department_id
      );

      if (newRequester_department_id !== currentRequester_department_id) {
        dataToUpdate.requester_department_id = newRequester_department_id;
        changesDetected = true;
      }
    }

    if (data.executor_department_id !== undefined) {
      const newExecutor_department_id = Number(data.executor_department_id);
      const currentExecutor_department_id = Number(
        ticket.executor_department_id
      );

      if (newExecutor_department_id !== currentExecutor_department_id) {
        dataToUpdate.executor_department_id = newExecutor_department_id;
        changesDetected = true;
      }
    }

    if (data.status !== undefined) {
      const newStatus = String(data.status).trim();
      const currentStatus = ticket.status.trim();

      if (newStatus !== currentStatus) {
        dataToUpdate.status = newStatus;
        changesDetected = true;
      }
    }

    if (data.title == "") {
      throw new Error("O título não pode ser vazio.");
    }

    if (data.description == "") {
      throw new Error("A descrição não pode ser vazia.");
    }

    if (!requesterDepartmentIdExists) {
      throw new Error(
        "O ID do departamento solicitante que você está tentado enviar não existe."
      );
    }
    if (!executorDepartmentIdExists) {
      throw new Error(
        "O ID do departamento executante que você está tentado enviar não existe."
      );
    }

    const validStatus = ["open", "in progress", "done"];

    if (data.status && !validStatus.includes(data.status)) {
      throw new Error(
        "Status inválido. Valores permitidos: Aberto, Em execução, Concluído."
      );
    }

    if (data.status == "") {
      throw new Error("O status não poder ser vazio.");
    }

    if (!changesDetected) {
      throw new Error(
        "Nenhuma alteração detectada. Os valores enviados são iguais aos atuais."
      );
    }

    await Ticket.update(dataToUpdate, { where: { id } });
    return Ticket.findByPk(id);
  }
}

export default new TicketService();
