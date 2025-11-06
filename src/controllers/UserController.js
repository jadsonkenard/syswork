import UserService from "../services/UserService.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();

      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const {
        full_name,
        cpf,
        phone,
        email,
        username,
        password,
        role,
        position_id,
        department_id,
        status,
      } = req.body;
      const user = await UserService.store({
        full_name,
        cpf,
        phone,
        email,
        username,
        password,
        role,
        position_id,
        department_id,
        status,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.findById(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        full_name,
        cpf,
        phone,
        email,
        username,
        role,
        position_id,
        department_id,
        status,
      } = req.body;

      const user = await UserService.update(id, {
        full_name,
        cpf,
        phone,
        email,
        username,
        role,
        position_id,
        department_id,
        status,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const updated = await UserService.updatePassword(id, { password });

      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await UserService.delete(id);

      res.status(200).json(deleted);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //BUSCA USUÁRIO POR FUNÇÃO
  async getUserByPosition(req, res) {
    try {
      const { id } = req.params;

      const users = UserService.getUserByPosition(id);

      res.json((await users).toJSON());
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //BUSCA USUÁRIO POR SETOR
  async getUserByDepartment(req, res) {
    try {
      const { id } = req.params;

      const users = UserService.getUserByDepartment(id);

      res.json((await users).toJSON());
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
