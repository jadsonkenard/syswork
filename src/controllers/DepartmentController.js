import DepartmentService from "../services/DepartmentService.js";

class DepartamentController {
  async getAll(req, res) {
    try {
      const departament = await DepartmentService.getAll();

      res.status(200).json(departament);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const { name, position_id } = req.body;

      const departament = await DepartmentService.store({ name, position_id });

      res.status(201).json(departament);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const departament = await DepartmentService.findById(id);

      res.status(200).json(departament);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, position_id } = req.body;

      const updated = await DepartmentService.update(id, {
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

      const deleted = await DepartmentService.delete(id);

      res.status(200).json(deleted);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //BUSCA OS CHAMADOS SOLICITADOS POR (SETOR SOLICITANTE)
  async getTicketRequestedDepartment(req, res) {
    try {
      const { id } = req.params;

      const tickets = await DepartmentService.getTicketRequestedDepartment(id);

      res.json((await tickets).toJSON());
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //BUSCA OS CHAMADOS RECEBIDOS (SETOR EXECUTANTE)
  async getTicketExecutorDepartment(req, res) {
    try {
      const { id } = req.params;

      const tickets = await DepartmentService.getTicketExecutorDepartment(id);

      res.json(tickets.toJSON());
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //BUSCA CHAMADOS DIRECIONADOS PARA O MEU SETOR
  async getTicketsMyDepartment(req, res) {
    try {
      const departmentId = req.user.department_id;

      const tickets = await DepartmentService.getTicketsMyDepartment(
        departmentId
      );

      return res.json(tickets);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //BUSCA CHAMADOS ABERTOS PELO MEU SETOR
  async getTicketsToDepartment(req, res) {
    try {
      const departmentId = req.user.department_id;

      const tickets = await DepartmentService.getTicketsToDepartment(
        departmentId
      );

      return res.json(tickets);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new DepartamentController();
