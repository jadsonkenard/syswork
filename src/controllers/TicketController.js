import TicketService from "../services/TicketService.js";

class TicketController {
  async getAll(req, res) {
    try {
      const tickets = await TicketService.getAll();

      res.status(200).json(tickets);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const {
        title,
        description,
        requester_department_id,
        executor_department_id,
        status,
      } = req.body;

      const ticket = await TicketService.store({
        title,
        description,
        requester_department_id,
        executor_department_id,
        status,
      });

      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const ticket = await TicketService.findById(id);

      res.status(200).json(ticket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new TicketController();
