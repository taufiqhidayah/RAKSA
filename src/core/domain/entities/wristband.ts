import {
  DeviceType,
  ProfileMode,
  WearerRole,
  WristbandStatus,
} from "../enums";
import { EmergencyId } from "../value-objects/emergency-id";
import { PublicToken } from "../value-objects/public-token";
import { ForbiddenError, ValidationError } from "../errors/domain-errors";

export interface WristbandProps {
  id: string;
  ownerId?: string;
  emergencyId: EmergencyId;
  publicToken: PublicToken;
  status: WristbandStatus;
  profileMode: ProfileMode;
  wearerRole: WearerRole;
  wearerLabel: string;
  deviceType?: DeviceType;
  notifyOnScan: boolean;
  nfcUrl: string;
  qrUrl: string;
  claimedAt?: Date;
  activatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Core aggregate root — represents a physical NFC/QR wristband.
 */
export class Wristband {
  readonly id: string;
  readonly ownerId?: string;
  readonly emergencyId: EmergencyId;
  readonly publicToken: PublicToken;
  readonly status: WristbandStatus;
  readonly profileMode: ProfileMode;
  readonly wearerRole: WearerRole;
  readonly wearerLabel: string;
  readonly deviceType?: DeviceType;
  readonly notifyOnScan: boolean;
  readonly nfcUrl: string;
  readonly qrUrl: string;
  readonly claimedAt?: Date;
  readonly activatedAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: WristbandProps) {
    this.id = props.id;
    this.ownerId = props.ownerId;
    this.emergencyId = props.emergencyId;
    this.publicToken = props.publicToken;
    this.status = props.status;
    this.profileMode = props.profileMode;
    this.wearerRole = props.wearerRole;
    this.wearerLabel = props.wearerLabel;
    this.deviceType = props.deviceType;
    this.notifyOnScan = props.notifyOnScan;
    this.nfcUrl = props.nfcUrl;
    this.qrUrl = props.qrUrl;
    this.claimedAt = props.claimedAt;
    this.activatedAt = props.activatedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static reconstitute(props: WristbandProps): Wristband {
    return new Wristband(props);
  }

  /**
   * Factory for a brand-new, unclaimed wristband created by an admin during
   * tag provisioning. Owner is intentionally absent until a customer claims it.
   */
  static register(props: {
    id: string;
    emergencyId: EmergencyId;
    publicToken: PublicToken;
    profileMode: ProfileMode;
    wearerRole: WearerRole;
    wearerLabel: string;
    deviceType?: DeviceType;
    notifyOnScan: boolean;
    nfcUrl: string;
    qrUrl: string;
    now: Date;
  }): Wristband {
    return new Wristband({
      id: props.id,
      ownerId: undefined,
      emergencyId: props.emergencyId,
      publicToken: props.publicToken,
      status: WristbandStatus.UNCLAIMED,
      profileMode: props.profileMode,
      wearerRole: props.wearerRole,
      wearerLabel: props.wearerLabel,
      deviceType: props.deviceType,
      notifyOnScan: props.notifyOnScan,
      nfcUrl: props.nfcUrl,
      qrUrl: props.qrUrl,
      createdAt: props.now,
      updatedAt: props.now,
    });
  }

  canBeHardDeleted(): boolean {
    return this.status === WristbandStatus.UNCLAIMED;
  }

  withRevoked(updatedAt: Date): Wristband {
    return Wristband.reconstitute({
      ...this.toProps(),
      status: WristbandStatus.REVOKED,
      updatedAt,
    });
  }

  isOwnedBy(userId: string): boolean {
    return this.ownerId === userId;
  }

  isPubliclyAccessible(): boolean {
    return this.status === WristbandStatus.ACTIVE;
  }

  canBeClaimed(): boolean {
    return this.status === WristbandStatus.UNCLAIMED;
  }

  assertOwnerAccess(userId: string): void {
    if (!this.isOwnedBy(userId)) {
      throw new ForbiddenError("You do not own this wristband");
    }
  }

  assertPublicAccess(): void {
    if (!this.isPubliclyAccessible()) {
      throw new ValidationError("Wristband is not active");
    }
  }

  withClaimed(ownerId: string, claimedAt: Date): Wristband {
    if (!this.canBeClaimed()) {
      throw new ValidationError("Wristband cannot be claimed");
    }

    return Wristband.reconstitute({
      ...this.toProps(),
      ownerId,
      status: WristbandStatus.CLAIMED,
      claimedAt,
      updatedAt: claimedAt,
    });
  }

  /**
   * Updates who wears the tag. Used when adding a family member (right after
   * claim) or editing an existing member. Owner/status are untouched.
   */
  withWearer(params: {
    wearerRole: WearerRole;
    wearerLabel: string;
    profileMode: ProfileMode;
    notifyOnScan: boolean;
    updatedAt: Date;
  }): Wristband {
    const label = params.wearerLabel.trim();
    if (!label) {
      throw new ValidationError("Member name is required", "wearerLabel");
    }

    return Wristband.reconstitute({
      ...this.toProps(),
      wearerRole: params.wearerRole,
      wearerLabel: label,
      profileMode: params.profileMode,
      notifyOnScan: params.notifyOnScan,
      updatedAt: params.updatedAt,
    });
  }

  /** Updates just the wearer's display label (used by the setup page). */
  withWearerLabel(wearerLabel: string, updatedAt: Date): Wristband {
    const label = wearerLabel.trim();
    if (!label) {
      throw new ValidationError("Nama wajib diisi", "wearerLabel");
    }

    return Wristband.reconstitute({
      ...this.toProps(),
      wearerLabel: label,
      updatedAt,
    });
  }

  withActivated(activatedAt: Date): Wristband {
    if (this.status !== WristbandStatus.CLAIMED) {
      throw new ValidationError("Wristband must be claimed before activation");
    }

    return Wristband.reconstitute({
      ...this.toProps(),
      status: WristbandStatus.ACTIVE,
      activatedAt,
      updatedAt: activatedAt,
    });
  }

  withDisabled(updatedAt: Date): Wristband {
    return Wristband.reconstitute({
      ...this.toProps(),
      status: WristbandStatus.DISABLED,
      updatedAt,
    });
  }

  /**
   * Owner-facing active/inactive toggle. Activating a claimed or disabled tag
   * makes its public page reachable; deactivating hides it again. Unclaimed or
   * revoked tags cannot be activated.
   */
  setActive(active: boolean, now: Date): Wristband {
    if (active) {
      if (
        this.status === WristbandStatus.UNCLAIMED ||
        this.status === WristbandStatus.REVOKED
      ) {
        throw new ValidationError("Tag harus diklaim sebelum diaktifkan");
      }
      if (this.status === WristbandStatus.ACTIVE) return this;
      return Wristband.reconstitute({
        ...this.toProps(),
        status: WristbandStatus.ACTIVE,
        activatedAt: this.activatedAt ?? now,
        updatedAt: now,
      });
    }

    if (this.status === WristbandStatus.DISABLED) return this;
    return Wristband.reconstitute({
      ...this.toProps(),
      status: WristbandStatus.DISABLED,
      updatedAt: now,
    });
  }

  private toProps(): WristbandProps {
    return {
      id: this.id,
      ownerId: this.ownerId,
      emergencyId: this.emergencyId,
      publicToken: this.publicToken,
      status: this.status,
      profileMode: this.profileMode,
      wearerRole: this.wearerRole,
      wearerLabel: this.wearerLabel,
      deviceType: this.deviceType,
      notifyOnScan: this.notifyOnScan,
      nfcUrl: this.nfcUrl,
      qrUrl: this.qrUrl,
      claimedAt: this.claimedAt,
      activatedAt: this.activatedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
