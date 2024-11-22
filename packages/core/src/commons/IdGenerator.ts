import { v4 as uuid, validate } from "uuid";

export default class IdGenerator {
  static newId(): string {
    return uuid();
  }

  static validate(id: string): boolean {
    return validate(id);
  }
}
