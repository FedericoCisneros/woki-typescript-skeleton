import {InvalidArgumentError} from "./InvalidArgumentError";
import {ValueObject} from "./ValueObject";

export class EmailValueObject extends ValueObject<string> {

  constructor(value: string) {
    super(value);
    this.validate(value);
  }

  private validate(value: string): void {
    if (!this.isEmail(value)) {
      throw new InvalidArgumentError("Value must be a valid email");
    }
  }

  isEmail(search: string): boolean {
    let serchfind: boolean;
    // tslint:disable-next-line:ter-max-len
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    serchfind = regexp.test(search);

    return serchfind;
  }

}
