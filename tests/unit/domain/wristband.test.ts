import { describe, expect, it } from "vitest";
import { Wristband } from "@/core/domain/entities/wristband";
import { EmergencyId } from "@/core/domain/value-objects/emergency-id";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import {
  ProfileMode,
  WearerRole,
  WristbandStatus,
} from "@/core/domain/enums";
import { ValidationError } from "@/core/domain/errors/domain-errors";

function createWristband(status: WristbandStatus) {
  return Wristband.reconstitute({
    id: "wb-1",
    emergencyId: EmergencyId.create("GS-A7K2-M9P4"),
    publicToken: PublicToken.create("a".repeat(32)),
    status,
    profileMode: ProfileMode.ADULT_EMERGENCY,
    wearerRole: WearerRole.SELF,
    wearerLabel: "My band",
    notifyOnScan: false,
    nfcUrl: "https://example.com/token",
    qrUrl: "https://example.com/GS-TEST-0001",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

describe("Wristband", () => {
  it("is publicly accessible only when active", () => {
    expect(createWristband(WristbandStatus.ACTIVE).isPubliclyAccessible()).toBe(true);
    expect(createWristband(WristbandStatus.DISABLED).isPubliclyAccessible()).toBe(false);
  });

  it("transitions from unclaimed to claimed", () => {
    const unclaimed = createWristband(WristbandStatus.UNCLAIMED);
    const claimed = unclaimed.withClaimed("user-1", new Date());

    expect(claimed.status).toBe(WristbandStatus.CLAIMED);
    expect(claimed.ownerId).toBe("user-1");
  });

  it("requires claimed status before activation", () => {
    const unclaimed = createWristband(WristbandStatus.UNCLAIMED);
    expect(() => unclaimed.withActivated(new Date())).toThrow(ValidationError);
  });
});
