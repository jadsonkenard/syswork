import Position from "../models/Position.js";

class PositionController {
  async getAll(req, res) {
    try {
      const positions = await Position.findAll();
      res.json(positions);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar funções. " + error });
    }
  }

  async store(req, res) {
    try {
      const { name, salary } = req.body;

      const position = await Position.create({ name, salary });
      res.status(201).json(position);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar função. " + error });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const position = await Position.findByPk(id);

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

      const position = await Position.findByPk(id);

      if (!position) {
        res.status(404).json({ message: "Função não econtrada." });
      }

      position.name = name;
      position.salary = salary;

      await position.save();

      res.json(position);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar função. " + error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const position = await Position.findByPk(id);

      if (!position) {
        res.status(404).json({ message: "Função não encontrada." });
      }

      await position.destroy();

      res.status(404).json({ message: "Função deletada com sucesso!." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar função. " + error });
    }
  }
}
export default new PositionController();
