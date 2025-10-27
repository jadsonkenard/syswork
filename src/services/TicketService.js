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

  async findById(id) {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      throw new Error("Chamado não encontrad0.");
    }

    return ticket;
  }
}

export default new TicketService();
