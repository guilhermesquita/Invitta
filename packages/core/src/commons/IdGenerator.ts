export default class IdGenerator {
  static newId(): string {
    return `${this.hash()}-${this.hash()}-${this.hash()}`;
  }

  private static hash(): string {
    return Math.random().toString(36).substr(2, 15);
  }
}
