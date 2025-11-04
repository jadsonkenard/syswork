import authService from "../services/authService.js";

export default {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async refresh(req, res) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refresh(refreshToken);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
};
