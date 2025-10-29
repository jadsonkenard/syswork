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
}

export default new UserController();
