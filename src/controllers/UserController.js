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
}

export default new UserController();
