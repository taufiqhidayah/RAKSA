import { PhoneNumber } from "../value-objects/phone-number";
import { ValidationError } from "../errors/domain-errors";

export interface EmergencyContactProps {
  id: string;
  wristbandId: string;
  name: string;
  relationship: string;
  phone: PhoneNumber;
  isPrimary: boolean;
  showNameOnPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class EmergencyContact {
  readonly id: string;
  readonly wristbandId: string;
  readonly name: string;
  readonly relationship: string;
  readonly phone: PhoneNumber;
  readonly isPrimary: boolean;
  readonly showNameOnPublic: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: EmergencyContactProps) {
    this.id = props.id;
    this.wristbandId = props.wristbandId;
    this.name = props.name;
    this.relationship = props.relationship;
    this.phone = props.phone;
    this.isPrimary = props.isPrimary;
    this.showNameOnPublic = props.showNameOnPublic;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static reconstitute(props: EmergencyContactProps): EmergencyContact {
    return new EmergencyContact(props);
  }

  static create(props: {
    id: string;
    wristbandId: string;
    name: string;
    relationship: string;
    phone: PhoneNumber;
    isPrimary: boolean;
    showNameOnPublic: boolean;
    now: Date;
  }): EmergencyContact {
    const name = props.name.trim();
    const relationship = props.relationship.trim();
    if (!name) {
      throw new ValidationError("Nama kontak wajib diisi", "name");
    }
    if (!relationship) {
      throw new ValidationError("Hubungan wajib diisi", "relationship");
    }

    return new EmergencyContact({
      id: props.id,
      wristbandId: props.wristbandId,
      name,
      relationship,
      phone: props.phone,
      isPrimary: props.isPrimary,
      showNameOnPublic: props.showNameOnPublic,
      createdAt: props.now,
      updatedAt: props.now,
    });
  }

  /** Returns a copy with primary flag changed (used when re-assigning the primary contact). */
  withPrimary(isPrimary: boolean, updatedAt: Date): EmergencyContact {
    return new EmergencyContact({
      id: this.id,
      wristbandId: this.wristbandId,
      name: this.name,
      relationship: this.relationship,
      phone: this.phone,
      isPrimary,
      showNameOnPublic: this.showNameOnPublic,
      createdAt: this.createdAt,
      updatedAt,
    });
  }
}
