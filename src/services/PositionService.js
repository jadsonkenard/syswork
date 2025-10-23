import Position from "../models/Position.js";

class PositionService {
  async getAll() {
    return await Position.findAll();
  }

  async store(data) {
    return await Position.create(data);
  }

  async findById(id) {
    return await Position.findByPk(id);
  }

  async update(id, data) {
    const position = await Position.findByPk(id);

    if (!position) return null;

    await Position.update(data, { where: { id } });
    return Position.findByPk(id);
  }

  async delete(id) {
    const position = await Position.findByPk(id);

    if (!position) return null;

    await position.destroy();

    return true;
  }
}

export default new PositionService();
