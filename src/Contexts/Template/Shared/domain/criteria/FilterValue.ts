import { IFilterValue } from "./IFilterValue";

export class FilterValue<T> implements IFilterValue {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
  getValue(): any {
    return this.value;
  }
}
