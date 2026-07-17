import { EmergencyProfile } from "../entities/emergency-profile";

/** Port — emergency profile persistence (one per wristband). */
export interface EmergencyProfileRepository {
  findByWristbandId(wristbandId: string): Promise<EmergencyProfile | null>;
  findByWristbandIds(wristbandIds: string[]): Promise<EmergencyProfile[]>;
  save(profile: EmergencyProfile): Promise<void>;
}
