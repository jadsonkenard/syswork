import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { existsSync, readFileSync } from "fs";
import { verify } from "crypto";
import { join } from "path";

export default function checkConsistency() {
  const licPath = join(__dirname, "loadCache", "temp.json");
  const pubPath = join(__dirname, "loadCache", "public.pem");

  if (!existsSync(licPath)) {
    return { valid: false, reason: "inconsistent-state" };
  }

  const licenseFile = JSON.parse(readFileSync(licPath, "utf8"));
  const publicKey = readFileSync(pubPath, "utf8");

  const { payload, signature } = licenseFile;

  const signatureValid = verify(
    "sha256",
    Buffer.from(payload, "utf8"),
    publicKey,
    Buffer.from(signature, "base64")
  );

  if (!signatureValid) {
    return { valid: false, reason: "invalid-signature" };
  }

  const data = JSON.parse(payload);

  if (new Date(data.expiresAt) < new Date()) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true, data };
}
