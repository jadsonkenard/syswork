import authService from "../services/authService.js";

export default {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const { accessToken, refreshToken, user } = await authService.login(
        username,
        password
      );

      // ---- Setar cookies seguros ----
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // Em produção, sempre true. Em dev pode ser false.
        sameSite: "lax",
        maxAge: 1000 * 60 * 15, // 15 minutos
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/api/auth/refresh",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async refresh(req, res) {
    try {
      // ---- Agora o refreshToken vem do cookie, não do body ----
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token ausente" });
      }

      const { accessToken, newRefreshToken } = await authService.refresh(
        refreshToken
      );

      // ---- Atualiza cookies ----
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 1000 * 60 * 15,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
  
  async logout(req, res) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/api/auth/refresh",
      });

      return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao fazer logout" });
    }
  },
};
