import { randomBytes, randomInt } from "node:crypto";
import { TokenGenerator } from "@/core/application/ports/token-generator";

// Unambiguous alphabet — excludes easily confused chars (0/O, 1/I) for codes
// and Emergency IDs that a human may need to read or type. Still a subset of
// [A-Z0-9], so it satisfies the EmergencyId / activation-code patterns.
const READABLE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomFrom(alphabet: string, length: number): string {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += alphabet[randomInt(0, alphabet.length)];
  }
  return out;
}

export class CryptoTokenGenerator implements TokenGenerator {
  generatePublicToken(): string {
    // 32 bytes -> 64 hex chars (>= 32 min length required by PublicToken).
    return randomBytes(32).toString("hex");
  }

  generateEmergencyId(): string {
    return `GS-${randomFrom(READABLE_ALPHABET, 4)}-${randomFrom(READABLE_ALPHABET, 4)}`;
  }

  generateActivationCode(): string {
    return randomFrom(READABLE_ALPHABET, 6);
  }
}
