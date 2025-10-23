import Position from "../models/Position.js";

class PositionService {
  //feito
  async getAll() {
    const position = await Position.findAll();
    if (!position) throw new Error("Ocorreu um erro ao buscar funções.");

    if (position == 0) throw new Error("Não foram encontradas funções.");

    return position;
  }

  //feito
  async store(data) {
    if (!data.name || data.name == "") {
      throw new Error("O nome precisa ser preenchido.");
    }
    if (data.salary <= 0) {
      throw new Error("O salario não poder ser 0 ou negativo");
    }
    if (!data.salary) {
      throw new Error("O salário precisa ser preenchido.");
    }

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
