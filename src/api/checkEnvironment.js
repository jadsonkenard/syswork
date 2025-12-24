import checkConsistency from "./checkConsistency.js";

/**
 * Middleware global de verificação do ambiente de execução
 * Executa validações básicas antes das rotas
 */

export default function checkEnvironment(req, res, next) {
  try {
    if (!process.env.NODE_ENV) {
      console.warn("[checkEnvironment] NODE_ENV não definido");
    }

    const majorVersion = Number(process.versions.node.split(".")[0]);
    if (majorVersion < 18) {
      console.warn(
        `[checkEnvironment] Versão do Node antiga: ${process.versions.node}`
      );
    }

    const timezoneOffset = Math.abs(new Date().getTimezoneOffset());
    if (timezoneOffset > 300) {
      console.warn("[checkEnvironment] Timezone fora do padrão esperado");
    }

    const license = checkConsistency();

    if (!license.valid) {
      return res.status(403).json({
        error: "License invalid",
        reason: license.reason,
      });
    }

    // Tudo OK, segue a requisição
    next();
  } catch (err) {
    console.error("[checkEnvironment] Erro inesperado:", err);
    return res.status(500).json({
      error: "Environment check failed",
    });
  }
}
