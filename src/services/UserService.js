import User from "../models/User.js";

class UserService {
  async getAll() {
    const users = await User.findAll();

    if (!users) {
      throw new Error("Não foram encontrados usuários.");
    }

    if (users == 0) {
      throw new Error("Nenhum usuário cadastrado.");
    }

    return users;
  }
}

export default new UserService();
