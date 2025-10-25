import DepartamentService from "../services/DepartamentService.js";

class DepartamentController {
  async getAll(req, res) {
    try {
      const departament = await DepartamentService.getAll();

      res.status(200).json(departament);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const { name, position_id } = req.body;

      const departament = await DepartamentService.store({ name, position_id });

      res.status(201).json(departament);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const departament = await DepartamentService.findById(id);

      res.status(200).json(departament);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, position_id } = req.body;

      const updated = await DepartamentService.update(id, {
        name,
        position_id,
      });

      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await DepartamentService.delete(id);

      res.status(200).json(deleted);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //BUSCA OS CHAMADOS SOLICITADOS POR SETOR
  async getTicketRequestedDepartment(req, res) {
    try {
      const { id } = req.params;

      const tickets = DepartamentService.getTicketRequestedDepartment(id);

      res.json((await tickets).toJSON());
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //BUSCA OS CHAMADOS RECEBIDOS (SETOR EXECUTANTE)
  async getTicketExecutorDepartment(req, res) {
    try {
      const { id } = req.params;

      const tickets = DepartamentService.getTicketExecutorDepartment(id);

      res.json((await tickets).toJSON());
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new DepartamentController();
