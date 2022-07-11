import {ValueObject} from "./ValueObject";

export class NumberValueObject extends ValueObject<number> {
  equalsTo(other: NumberValueObject): boolean {
    return this.value === other.value;
  }

  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value;
  }

  isBiggerOrEqualThan(other: NumberValueObject): boolean {
    return this.value >= other.value;
  }

  isSmallerThan(other: NumberValueObject) {
    return this.value < other.value;
  }

  isSmallerOrEqualThan(other: NumberValueObject) {
    return this.value <= other.value;
  }
}
