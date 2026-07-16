import { describe, expect, it } from "vitest";
import { GetPublicEmergencyPageUseCase } from "@/core/application/use-cases/emergency/get-public-emergency-page.use-case";
import { Wristband } from "@/core/domain/entities/wristband";
import { EmergencyProfile } from "@/core/domain/entities/emergency-profile";
import { EmergencyContact } from "@/core/domain/entities/emergency-contact";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import { PhoneNumber } from "@/core/domain/value-objects/phone-number";
import {
  ProfileMode,
  WearerRole,
  WristbandStatus,
} from "@/core/domain/enums";
import { InactiveWristbandError } from "@/core/domain/errors/domain-errors";
import type {
  WristbandListFilter,
  WristbandListResult,
  WristbandRepository,
} from "@/core/domain/repositories/wristband-repository";
import type { EmergencyProfileRepository } from "@/core/domain/repositories/emergency-profile-repository";
import type { EmergencyContactRepository } from "@/core/domain/repositories/emergency-contact-repository";

const now = new Date("2026-07-16T10:00:00.000Z");
const token = "t".repeat(64);

function makeWristband(
  status: WristbandStatus = WristbandStatus.ACTIVE,
): Wristband {
  return Wristband.reconstitute({
    id: "wristband-1",
    ownerId: "owner-1",
    emergencyId: EmergencyId.create("GS-AAAA-1111"),
    publicToken: PublicToken.create(token),
    status,
    profileMode: ProfileMode.CHILD_GUARDIAN,
    wearerRole: WearerRole.CHILD,
    wearerLabel: "Anak pertama",
    notifyOnScan: true,
    nfcUrl: "https://example.test/GS-AAAA-1111",
    qrUrl: "https://example.test/GS-AAAA-1111",
    activatedAt: now,
    createdAt: now,
    updatedAt: now,
  });
}

class FakeWristbandRepository implements WristbandRepository {
  constructor(private readonly wristband: Wristband | null) {}

  async findById() {
    return this.wristband;
  }
  async findByOwnerId() {
    return this.wristband ? [this.wristband] : [];
  }
  async findByPublicToken(value: PublicToken) {
    return this.wristband?.publicToken.value === value.value ? this.wristband : null;
  }
  async findByEmergencyId(value: EmergencyId) {
    return this.wristband?.emergencyId.value === value.value ? this.wristband : null;
  }
  async save() {}
  async findAll(_filter: WristbandListFilter): Promise<WristbandListResult> {
    return { items: this.wristband ? [this.wristband] : [], total: this.wristband ? 1 : 0 };
  }
  async countByStatus() {
    return {};
  }
  async countActivatedSince() {
    return 0;
  }
  async delete() {}
}

class FakeProfileRepository implements EmergencyProfileRepository {
  constructor(private readonly profile: EmergencyProfile | null) {}

  async findByWristbandId() {
    return this.profile;
  }
  async save() {}
}

class FakeContactRepository implements EmergencyContactRepository {
  constructor(private readonly contacts: EmergencyContact[]) {}

  async findByWristbandId() {
    return this.contacts;
  }
  async save() {}
  async delete() {}
}

function makeProfile(isPublicEnabled = true): EmergencyProfile {
  return EmergencyProfile.reconstitute({
    id: "profile-1",
    wristbandId: "wristband-1",
    preferredName: "Alya",
    approximateAge: 8,
    criticalAllergies: "Kacang",
    cognitiveConditionFlag: false,
    isPublicEnabled,
    lastConfirmedAt: now,
    createdAt: now,
    updatedAt: now,
  });
}

function makeContact(showNameOnPublic: boolean): EmergencyContact {
  return EmergencyContact.reconstitute({
    id: showNameOnPublic ? "contact-1" : "contact-2",
    wristbandId: "wristband-1",
    name: showNameOnPublic ? "Budi" : "Rahasia",
    relationship: "Ayah",
    phone: PhoneNumber.create("081234567890"),
    isPrimary: showNameOnPublic,
    showNameOnPublic,
    createdAt: now,
    updatedAt: now,
  });
}

function makeUseCase(
  wristband = makeWristband(),
  profile: EmergencyProfile | null = makeProfile(),
) {
  return new GetPublicEmergencyPageUseCase({
    wristbandRepository: new FakeWristbandRepository(wristband),
    emergencyProfileRepository: new FakeProfileRepository(profile),
    emergencyContactRepository: new FakeContactRepository([
      makeContact(true),
      makeContact(false),
    ]),
  });
}

describe("GetPublicEmergencyPageUseCase", () => {
  it("returns the same public data by token and Emergency ID", async () => {
    const useCase = makeUseCase();

    const byToken = await useCase.execute(token);
    const byEmergencyId = await useCase.executeByEmergencyId("gs-aaaa-1111");

    expect(byEmergencyId).toEqual(byToken);
    expect(byEmergencyId.preferredName).toBe("Alya");
    expect(byEmergencyId.lastConfirmedAt).toBe(now.toISOString());
    expect(byEmergencyId.contacts).toEqual([
      {
        label: "Budi",
        relationship: "Ayah",
        telUri: "tel:+6281234567890",
        isPrimary: true,
      },
      {
        label: "Ayah",
        relationship: "Ayah",
        telUri: "tel:+6281234567890",
        isPrimary: false,
      },
    ]);
  });

  it("rejects an inactive wristband", async () => {
    const useCase = makeUseCase(makeWristband(WristbandStatus.DISABLED));

    await expect(useCase.executeByEmergencyId("GS-AAAA-1111")).rejects.toBeInstanceOf(
      InactiveWristbandError,
    );
  });

  it("does not expose a disabled public profile", async () => {
    const useCase = makeUseCase(makeWristband(), makeProfile(false));

    await expect(useCase.execute(token)).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});
