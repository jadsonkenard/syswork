import PositionService from "../services/PositionService.js";

class PositionController {
  async getAll(req, res) {
    try {
      const positions = await PositionService.getAll();
      res.json(positions);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar funções. " + error });
    }
  }

  async store(req, res) {
    try {
      const { name, salary } = req.body;

      const position = await PositionService.store({ name, salary });
      res.status(201).json(position);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar função. " + error });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const position = await PositionService.findById(id);

      if (!position) {
        res.status(404).json({ message: "Função não econtrada." });
      }

      res.json(position);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar função. " + error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, salary } = req.body;

      const updated = await PositionService.update(id, { name, salary });

      if (!updated) {
        res.status(404).json({ message: "Função não econtrada." });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar função. " + error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await PositionService.delete(id);

      if (!deleted) {
        res.status(404).json({ message: "Função não encontrada." });
      }

      res.status(404).json({ message: "Função deletada com sucesso!." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar função. " + error });
    }
  }
}
export default new PositionController();
