import Ticket from "../models/Ticket.js";

class TicketService {
  async getAll() {
    const tickets = await Ticket.findAll();

    return tickets;
  }

  async store(data) {
    await Ticket.create(data);
    return { message: "Chamado criado com sucesso." };
  }
}

export default new TicketService();
