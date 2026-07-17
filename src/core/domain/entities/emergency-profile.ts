import { ValidationError } from "../errors/domain-errors";

export interface EmergencyProfileProps {
  id: string;
  wristbandId: string;
  preferredName: string;
  approximateAge?: number;
  bloodType?: string;
  criticalAllergies?: string;
  medicalConditions?: string;
  importantMedications?: string;
  emergencyNotes?: string;
  reunificationNote?: string;
  disorientationNotes?: string;
  cognitiveConditionFlag: boolean;
  languageHint?: string;
  photoUrl?: string;
  isPublicEnabled: boolean;
  lastConfirmedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class EmergencyProfile {
  readonly id: string;
  readonly wristbandId: string;
  readonly preferredName: string;
  readonly approximateAge?: number;
  readonly bloodType?: string;
  readonly criticalAllergies?: string;
  readonly medicalConditions?: string;
  readonly importantMedications?: string;
  readonly emergencyNotes?: string;
  readonly reunificationNote?: string;
  readonly disorientationNotes?: string;
  readonly cognitiveConditionFlag: boolean;
  readonly languageHint?: string;
  readonly photoUrl?: string;
  readonly isPublicEnabled: boolean;
  readonly lastConfirmedAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: EmergencyProfileProps) {
    this.id = props.id;
    this.wristbandId = props.wristbandId;
    this.preferredName = props.preferredName;
    this.approximateAge = props.approximateAge;
    this.bloodType = props.bloodType;
    this.criticalAllergies = props.criticalAllergies;
    this.medicalConditions = props.medicalConditions;
    this.importantMedications = props.importantMedications;
    this.emergencyNotes = props.emergencyNotes;
    this.reunificationNote = props.reunificationNote;
    this.disorientationNotes = props.disorientationNotes;
    this.cognitiveConditionFlag = props.cognitiveConditionFlag;
    this.languageHint = props.languageHint;
    this.photoUrl = props.photoUrl;
    this.isPublicEnabled = props.isPublicEnabled;
    this.lastConfirmedAt = props.lastConfirmedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static reconstitute(props: EmergencyProfileProps): EmergencyProfile {
    return new EmergencyProfile(props);
  }

  /**
   * Creates a fresh emergency profile. Used when a wearer photo is uploaded
   * before the full profile setup wizard exists — the profile is enabled so the
   * photo is visible on the public page.
   */
  static create(props: {
    id: string;
    wristbandId: string;
    preferredName: string;
    photoUrl?: string;
    isPublicEnabled?: boolean;
    now: Date;
  }): EmergencyProfile {
    return new EmergencyProfile({
      id: props.id,
      wristbandId: props.wristbandId,
      preferredName: props.preferredName,
      cognitiveConditionFlag: false,
      photoUrl: props.photoUrl,
      isPublicEnabled: props.isPublicEnabled ?? true,
      createdAt: props.now,
      updatedAt: props.now,
    });
  }

  /** Returns a copy with the editable emergency details updated (used by the setup page). */
  withDetails(params: {
    preferredName: string;
    approximateAge?: number;
    bloodType?: string;
    criticalAllergies?: string;
    medicalConditions?: string;
    importantMedications?: string;
    emergencyNotes?: string;
    languageHint?: string;
    isPublicEnabled: boolean;
    updatedAt: Date;
  }): EmergencyProfile {
    const preferredName = params.preferredName.trim();
    if (!preferredName) {
      throw new ValidationError("Nama wajib diisi", "preferredName");
    }

    return new EmergencyProfile({
      ...this.toProps(),
      preferredName,
      approximateAge: params.approximateAge,
      bloodType: params.bloodType,
      criticalAllergies: params.criticalAllergies,
      medicalConditions: params.medicalConditions,
      importantMedications: params.importantMedications,
      emergencyNotes: params.emergencyNotes,
      languageHint: params.languageHint,
      isPublicEnabled: params.isPublicEnabled,
      updatedAt: params.updatedAt,
    });
  }

  /** Returns a copy with the wearer photo set (or cleared when `photoUrl` is undefined). */
  withPhoto(photoUrl: string | undefined, updatedAt: Date): EmergencyProfile {
    return new EmergencyProfile({
      ...this.toProps(),
      photoUrl,
      updatedAt,
    });
  }

  private toProps(): EmergencyProfileProps {
    return {
      id: this.id,
      wristbandId: this.wristbandId,
      preferredName: this.preferredName,
      approximateAge: this.approximateAge,
      bloodType: this.bloodType,
      criticalAllergies: this.criticalAllergies,
      medicalConditions: this.medicalConditions,
      importantMedications: this.importantMedications,
      emergencyNotes: this.emergencyNotes,
      reunificationNote: this.reunificationNote,
      disorientationNotes: this.disorientationNotes,
      cognitiveConditionFlag: this.cognitiveConditionFlag,
      languageHint: this.languageHint,
      photoUrl: this.photoUrl,
      isPublicEnabled: this.isPublicEnabled,
      lastConfirmedAt: this.lastConfirmedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
