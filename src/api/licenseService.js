import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { existsSync, readFileSync } from "fs";
import { verify } from "crypto";
import { join } from "path";

export default function loadLicense() {
  const licPath = join(__dirname, "license", "license.json");
  const pubPath = join(__dirname, "license", "public.pem");

  if (!existsSync(licPath)) {
    return { valid: false, reason: "missing-license" };
  }

  const licenseFile = JSON.parse(readFileSync(licPath, "utf8"));
  const publicKey = readFileSync(pubPath, "utf8");

  const { payload, signature } = licenseFile;

  // 1. Verifica assinatura
  const signatureValid = verify(
    "sha256",
    Buffer.from(payload, "utf8"),
    publicKey,
    Buffer.from(signature, "base64")
  );

  if (!signatureValid) {
    return { valid: false, reason: "invalid-signature" };
  }

  // 2. Verifica expiração
  const data = JSON.parse(payload);

  if (new Date(data.expiresAt) < new Date()) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true, data };
}
