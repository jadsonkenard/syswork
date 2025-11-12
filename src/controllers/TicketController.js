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
        requester_user_id,
        status,
      } = req.body;

      const ticket = await TicketService.store({
        title,
        description,
        requester_department_id,
        executor_department_id,
        requester_user_id,
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

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        requester_department_id,
        executor_department_id,
        status,
      } = req.body;

      const updated = await TicketService.update(id, {
        title,
        description,
        requester_department_id,
        executor_department_id,
        status,
      });

      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await TicketService.updateStatus(id, { status });

      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getTicketByUser(req, res) {
    try {
      const { id } = req.params; // id do usuário
      const tickets = await TicketService.getTicketByUser(id);
      return res.status(200).json(tickets);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleteTicket = await TicketService.delete(id);

      res.status(200).json(deleteTicket);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new TicketController();
