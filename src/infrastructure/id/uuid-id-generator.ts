import { randomUUID } from "node:crypto";
import { IdGenerator } from "@/core/application/ports/id-generator";

export class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return randomUUID();
  }
}
