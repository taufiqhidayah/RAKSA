import { describe, expect, it } from "vitest";
import { RegisterWristbandUseCase } from "@/core/application/use-cases/admin/register-wristband.use-case";
import { Wristband } from "@/core/domain/entities/wristband";
import { ActivationCode } from "@/core/domain/entities/activation-code";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import { WristbandStatus, ProfileMode, WearerRole } from "@/core/domain/enums";
import type {
  WristbandRepository,
  WristbandListFilter,
  WristbandListResult,
} from "@/core/domain/repositories/wristband-repository";
import type { ActivationCodeRepository } from "@/core/domain/repositories/activation-code-repository";
import type { TokenGenerator } from "@/core/application/ports/token-generator";
import type { Clock } from "@/core/application/ports/clock";
import type { IdGenerator } from "@/core/application/ports/id-generator";

class FakeWristbandRepository implements WristbandRepository {
  saved: Wristband[] = [];
  deleted: string[] = [];

  async findById(id: string) {
    return this.saved.find((w) => w.id === id) ?? null;
  }
  async findByOwnerId() {
    return [];
  }
  async findByPublicToken(token: PublicToken) {
    return this.saved.find((w) => w.publicToken.value === token.value) ?? null;
  }
  async findByEmergencyId(emergencyId: EmergencyId) {
    return this.saved.find((w) => w.emergencyId.value === emergencyId.value) ?? null;
  }
  async save(w: Wristband) {
    this.saved = this.saved.filter((x) => x.id !== w.id).concat(w);
  }
  async findAll(_filter: WristbandListFilter): Promise<WristbandListResult> {
    return { items: this.saved, total: this.saved.length };
  }
  async countByStatus() {
    return {};
  }
  async countActivatedSince() {
    return 0;
  }
  async delete(id: string) {
    this.deleted.push(id);
    this.saved = this.saved.filter((w) => w.id !== id);
  }
}

class FakeActivationCodeRepository implements ActivationCodeRepository {
  saved: ActivationCode[] = [];
  existing = new Set<string>();
  failNextSave = false;

  async findUnusedByCode() {
    return null;
  }
  async findUnusedByWristbandId() {
    return null;
  }
  async findByWristbandId() {
    return null;
  }
  async findByWristbandIds() {
    return [];
  }
  async existsByCode(code: string) {
    return this.existing.has(code);
  }
  async save(code: ActivationCode) {
    if (this.failNextSave) {
      throw new Error("db error");
    }
    this.saved.push(code);
  }
}

class ScriptedTokenGenerator implements TokenGenerator {
  private emergencyIds: string[];
  private tokens: string[];
  private codes: string[];

  constructor(opts: { emergencyIds?: string[]; tokens?: string[]; codes?: string[] } = {}) {
    this.emergencyIds = opts.emergencyIds ?? ["GS-AAAA-1111"];
    this.tokens = opts.tokens ?? ["t".repeat(64)];
    this.codes = opts.codes ?? ["ABC123"];
  }
  generateEmergencyId() {
    return this.emergencyIds.length > 1 ? this.emergencyIds.shift()! : this.emergencyIds[0];
  }
  generatePublicToken() {
    return this.tokens.length > 1 ? this.tokens.shift()! : this.tokens[0];
  }
  generateActivationCode() {
    return this.codes.length > 1 ? this.codes.shift()! : this.codes[0];
  }
}

const fixedClock: Clock = { now: () => new Date("2026-01-01T00:00:00Z") };

class SequentialIdGenerator implements IdGenerator {
  private n = 0;
  generate() {
    this.n += 1;
    return `id-${this.n}`;
  }
}

function makeUseCase(overrides: {
  wristbandRepo?: FakeWristbandRepository;
  codeRepo?: FakeActivationCodeRepository;
  tokenGen?: TokenGenerator;
} = {}) {
  const wristbandRepository = overrides.wristbandRepo ?? new FakeWristbandRepository();
  const activationCodeRepository = overrides.codeRepo ?? new FakeActivationCodeRepository();
  const tokenGenerator = overrides.tokenGen ?? new ScriptedTokenGenerator();

  const useCase = new RegisterWristbandUseCase({
    wristbandRepository,
    activationCodeRepository,
    tokenGenerator,
    idGenerator: new SequentialIdGenerator(),
    clock: fixedClock,
    appBaseUrl: "https://gelangsiaga.test/",
  });

  return { useCase, wristbandRepository, activationCodeRepository };
}

describe("RegisterWristbandUseCase", () => {
  it("provisions an unclaimed wristband with a generated code and public URL", async () => {
    const { useCase, wristbandRepository, activationCodeRepository } = makeUseCase();

    const output = await useCase.execute({});

    expect(output.emergencyId).toBe("GS-AAAA-1111");
    expect(output.activationCode).toBe("ABC123");
    expect(output.nfcUrl).toBe(`https://gelangsiaga.test/${"t".repeat(64)}`);
    expect(output.qrUrl).toBe("https://gelangsiaga.test/GS-AAAA-1111");

    expect(wristbandRepository.saved).toHaveLength(1);
    expect(wristbandRepository.saved[0].status).toBe(WristbandStatus.UNCLAIMED);
    expect(activationCodeRepository.saved).toHaveLength(1);
  });

  it("defaults to adult_emergency/self but honors provided role & mode", async () => {
    const { useCase, wristbandRepository } = makeUseCase();

    await useCase.execute({
      profileMode: ProfileMode.CHILD_GUARDIAN,
      wearerRole: WearerRole.CHILD,
      wearerLabel: "Anak - #1",
    });

    const saved = wristbandRepository.saved[0];
    expect(saved.profileMode).toBe(ProfileMode.CHILD_GUARDIAN);
    expect(saved.wearerRole).toBe(WearerRole.CHILD);
    expect(saved.wearerLabel).toBe("Anak - #1");
    // dependent tags default to notify-on-scan enabled
    expect(saved.notifyOnScan).toBe(true);
  });

  it("retries Emergency ID generation on collision", async () => {
    const wristbandRepo = new FakeWristbandRepository();
    // Pre-seed a wristband that owns GS-DUPE-0000 so the first candidate collides.
    await wristbandRepo.save(
      Wristband.register({
        id: "existing",
        emergencyId: EmergencyId.create("GS-DUPE-0000"),
        publicToken: PublicToken.create("x".repeat(64)),
        profileMode: ProfileMode.ADULT_EMERGENCY,
        wearerRole: WearerRole.SELF,
        wearerLabel: "existing",
        notifyOnScan: false,
        nfcUrl: "https://x/token",
        qrUrl: "https://x/GS-DUPE-0000",
        now: new Date(),
      }),
    );

    const tokenGen = new ScriptedTokenGenerator({
      emergencyIds: ["GS-DUPE-0000", "GS-GOOD-9999"],
      tokens: ["y".repeat(64)],
      codes: ["ZZZ999"],
    });

    const { useCase } = makeUseCase({ wristbandRepo, tokenGen });
    const output = await useCase.execute({});

    expect(output.emergencyId).toBe("GS-GOOD-9999");
  });

  it("rolls back the orphan wristband when saving the activation code fails", async () => {
    const codeRepo = new FakeActivationCodeRepository();
    codeRepo.failNextSave = true;
    const { useCase, wristbandRepository } = makeUseCase({ codeRepo });

    await expect(useCase.execute({})).rejects.toThrow();
    expect(wristbandRepository.saved).toHaveLength(0);
    expect(wristbandRepository.deleted).toHaveLength(1);
  });
});
