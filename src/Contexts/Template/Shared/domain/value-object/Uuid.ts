import {v4 as uuid} from 'uuid';
import validate from 'uuid-validate';
import { NonEmptyStringValueObject } from './NonEmptyStringValueObject';
//import {ValueObject} from "./ValueObject";

export class Uuid extends NonEmptyStringValueObject {
  constructor(value: string) {
    super(value);
    //this.ensureIsValidUuid(value);
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }

  static isValid(id: string): boolean {
    const version = validate.version(id);
    return validate(id, version);
  }

  // private ensureIsValidUuid(id: string): void {
  //   if (!Uuid.isValid(id)) {
  //     throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
  //   }
  // }
}
