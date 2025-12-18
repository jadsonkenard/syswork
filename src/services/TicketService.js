import db from "../database/models/index.js";

const { Ticket, Department, User } = db;

class TicketService {
  // async getAll() {
  //   const tickets = await Ticket.findAll();

  //   if (tickets == 0) {
  //     throw new Error("Não forma encontrados chamados.");
  //   }

  //   return tickets;
  // }

  async getAll(page = 1, limit = 20) {
    const offset = (page - 1) * limit;

    const { rows: tickets, count: total } = await Ticket.findAndCountAll({
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

    if (tickets.length === 0) {
      throw new Error("Nenhum chamado encontrado.");
    }

    return {
      data: tickets,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async store(data) {
    const requesterDepartmentIdExists = await Department.findByPk(
      data.requester_department_id
    );
    const executorDepartmentIdExists = await Department.findByPk(
      data.executor_department_id
    );

    const requesterUser = await User.findByPk(data.requester_user_id);

    if (!data.title) {
      throw new Error("O Título do chamado precisa ser informado.");
    }

    if (!data.description) {
      throw new Error("A descrição do chamado precisa ser informado.");
    }

    if (data.description.length > 255) {
      throw new Error("Quantidade máxima de caracteres excedida. Máx: 255");
    }

    if (!data.requester_user_id) {
      throw new Error("O usuário solicitante não enviado.");
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

    if (!requesterUser) {
      throw new Error("Usuário solicitante não existe.");
    }

    await Ticket.create(data);
    return { message: "Chamado criado com sucesso." };
  }

  async findById(id) {
    const ticket = await Ticket.findByPk(id, {
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

    if (!ticket) {
      throw new Error("Chamado não encontrado.");
    }

    return ticket;
  }

  //ATUALIZA UM CHAMADO POR COMPLETO
  async update(id, data) {
    const ticket = await Ticket.findByPk(id);
    const requesterDepartmentIdExists = await Department.findByPk(
      data.requester_department_id
    );
    const executorDepartmentIdExists = await Department.findByPk(
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
      if (!requesterDepartmentIdExists) {
        throw new Error(
          "O ID do departamento solicitante que você está tentado enviar não existe."
        );
      }

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
      if (!executorDepartmentIdExists) {
        throw new Error(
          "O ID do departamento executante que você está tentado enviar não existe."
        );
      }
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

  //ATLUALIZA STATUS DE UM CHAMADO
  async updateStatus(id, data, options) {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      throw new Error("Chamado não encontrado.");
    }

    if (data.status == "") {
      throw new Error("O Status precisar ser informado.");
    }

    if (ticket.status === "done" && !options.isAdmin) {
      throw new Error(
        "Chamados finalizados não podem mais sofrer alterações de status."
      );
    } else if (ticket.status === "done" && options.isAdmin) {
      throw new Error("Para modificar o status vá até: vá em Editar");
    }

    const validStatus = ["open", "in progress", "done"];

    if (data.status && !validStatus.includes(data.status)) {
      throw new Error(
        "Status inválido. Valores permitidos: Aberto, Em execução, Concluído."
      );
    }

    await Ticket.update(data, { where: { id } });
    return Ticket.findByPk(id);
  }

  //BUSCA CHAMADOS POR ID DO USUÁRIO
  async getTicketByUser(id, page = 1, limit = 20) {
    const userExists = await User.findByPk(id);

    if (!userExists) {
      throw new Error("Este ID de usuário não existe.");
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Ticket.findAndCountAll({
      where: { requester_user_id: id },
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

    if (rows.length === 0) {
      throw new Error("Nenhum chamado encontrado.");
    }

    return {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit),
      data: rows, // <-- Mesmo vazio, isso é o correto
    };
  }

  //BUSCA CHAMADOS PELO USUÁRIO LOGADO
  // async getMyTickets(id, page = 1, limit = 20) {
  //   const tickets = await Ticket.find({
  //     where: { requester_user_id: id },
  //     include: [
  //       {
  //         model: User,
  //         as: "requester_user",
  //         attributes: ["id", "full_name", "email"],
  //       },
  //     ],
  //   });

  //   return tickets;
  // }
  async getMyTickets(id, page = 1, limit = 20) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Ticket.findAndCountAll({
      where: { requester_user_id: id },
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

    return {
      total: count,
      page,
      limit,
      pages: Math.ceil(count / limit),
      data: rows,
    };
  }

  async delete(id) {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      throw new Error("Chamado não encontrado.");
    }

    await ticket.destroy();
    return { message: "Chamado deletado com sucesso." };
  }
}

export default new TicketService();
