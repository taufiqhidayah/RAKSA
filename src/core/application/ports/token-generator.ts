/**
 * Port — secure, random identifier generation for tag provisioning.
 *
 * Implementations MUST use a cryptographically secure source. Values are
 * random and non-sequential per the security spec (never guessable).
 */
export interface TokenGenerator {
  /** URL-safe secret token for the public emergency page (`/[token]`). */
  generatePublicToken(): string;
  /** Human-readable, visible Emergency ID in the format GS-XXXX-XXXX. */
  generateEmergencyId(): string;
  /** One-time, 6-character activation code (A-Z0-9). */
  generateActivationCode(): string;
}
