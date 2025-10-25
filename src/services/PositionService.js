import Position from "../models/Position.js";

class PositionService {
  async getAll() {
    const position = await Position.findAll();
    if (!position) throw new Error("Ocorreu um erro ao buscar funções.");

    if (position == 0) throw new Error("Não foram encontradas funções.");

    return position;
  }

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
    const position = await Position.findByPk(id);

    if (!position) {
      throw new Error("Função não encontrada.");
    }

    return position;
  }

  async update(id, data) {
    const position = await Position.findByPk(id);

    if (!position) {
      throw new Error("Função não encontrada.");
    }

    if (data.name == "") {
      throw new Error("O nome da função não pode ser vazio.");
    }

    if (!data.name) {
      throw new Error("O nome da função precisa ser informado.");
    }

    if (data.salary <= 0) {
      throw new Error("O salario não poder ser 0 ou negativo");
    }

    if (!data.salary) {
      throw new Error("O salário precisa ser preenchido.");
    }

    await Position.update(data, { where: { id } });
    return Position.findByPk(id);
  }

  async delete(id) {
    const position = await Position.findByPk(id);

    if (!position) {
      throw new Error("Função não encontrada.");
    }

    await position.destroy();
    return { message: "Função deletada." };
  }
}

export default new PositionService();
