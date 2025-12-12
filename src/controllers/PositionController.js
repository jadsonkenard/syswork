import PositionService from "../services/PositionService.js";

class PositionController {
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const positions = await PositionService.getAll(page, limit);
      res.json(positions);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const { name, salary } = req.body;

      const position = await PositionService.store({ name, salary });
      res.status(201).json(position);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const position = await PositionService.findById(id);

      res.json(position);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, salary } = req.body;

      const updated = await PositionService.update(id, { name, salary });

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await PositionService.delete(id);

      res.status(200).json(deleted);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default new PositionController();
