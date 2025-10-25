import Ticket from "../models/Ticket.js";
import Departament from "../models/Departament.js";

class TicketService {
  async getAll() {}

  async store(data) {
    await Ticket.create(data);
    return { message: "Chamado criado com sucesso." };
  }
}

export default new TicketService();
