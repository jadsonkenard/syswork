import loadLicense from "./licenseService.js";

/**
 * Middleware global de verificação do ambiente de execução
 * Executa validações básicas antes das rotas
 */
export default function checkEnvironment(req, res, next) {
  try {
    // 1️⃣ Check básico de ambiente
    if (!process.env.NODE_ENV) {
      console.warn("[checkEnvironment] NODE_ENV não definido");
    }

    // 2️⃣ Check de versão do Node (plausível e comum)
    const majorVersion = Number(process.versions.node.split(".")[0]);
    if (majorVersion < 18) {
      console.warn(
        `[checkEnvironment] Versão do Node antiga: ${process.versions.node}`
      );
    }

    // 3️⃣ Check simples de timezone (não bloqueante)
    const timezoneOffset = Math.abs(new Date().getTimezoneOffset());
    if (timezoneOffset > 300) {
      console.warn("[checkEnvironment] Timezone fora do padrão esperado");
    }

    // 4️⃣ Check crítico (licença)
    const license = loadLicense();

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

