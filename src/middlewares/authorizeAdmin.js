export function authorizeAdmin(req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acesso negado. Requer permissão de administrador." });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao verificar permissões.", error: error.message });
  }
}
