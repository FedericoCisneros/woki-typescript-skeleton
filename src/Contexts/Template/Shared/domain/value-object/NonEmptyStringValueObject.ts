import { StringLengthIs0 } from "../StringLengthIs0";
import { ValueObject } from "./ValueObject";

export class NonEmptyStringValueObject extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsMoreThan0(value);
    }

    private ensureLengthIsMoreThan0(value: string): void {
        if (value.length === 0) {
            throw new StringLengthIs0("The string cannot be empty");
        }
    }
}
