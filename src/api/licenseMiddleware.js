import loadLicense from "./licenseService.js";

export function licenseMiddleware(req, res, next) {
  const result = loadLicense();

  if (!result.valid) {
    return res
      .status(403)
      .json({ error: "License invalid", reason: result.reason });
  }

  // tudo certo
  next();
}
