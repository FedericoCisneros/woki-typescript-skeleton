import { EnumValueObject } from "../value-object/EnumValueObject";
import { InvalidArgumentError } from "../value-object/InvalidArgumentError";

export enum Operator {
  EQUAL = "==",
  NOT_EQUAL = "!=",
  GT = ">",
  GT_OREQUAL = ">=",
  LT = "<",
  LT_OREQUAL = "<=",
  ARRAY_CONTAINS = "array-contains",
  ARRAY_CONTAINS_ANY = "array-contains-any",
  IN = "in",
  NOT_IN = "not-in"
}

export class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Object.values(Operator));
  }

  static fromValue(value: string): FilterOperator {
    switch (value) {
      case Operator.EQUAL:
        return new FilterOperator(Operator.EQUAL);
      case Operator.NOT_EQUAL:
        return new FilterOperator(Operator.NOT_EQUAL);
      case Operator.GT:
        return new FilterOperator(Operator.GT);
      case Operator.GT_OREQUAL:
        return new FilterOperator(Operator.GT_OREQUAL);
      case Operator.LT:
        return new FilterOperator(Operator.LT);
      case Operator.LT_OREQUAL:
        return new FilterOperator(Operator.LT_OREQUAL);
      case Operator.ARRAY_CONTAINS:
        return new FilterOperator(Operator.ARRAY_CONTAINS);
      case Operator.ARRAY_CONTAINS_ANY:
        return new FilterOperator(Operator.ARRAY_CONTAINS_ANY);
      case Operator.IN:
        return new FilterOperator(Operator.ARRAY_CONTAINS_ANY);
      case Operator.NOT_IN:
        return new FilterOperator(Operator.ARRAY_CONTAINS_ANY);
      default:
        throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
    }
  }

  protected throwErrorForInvalidValue(value: Operator): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`);
  }

  static equal() {
    return this.fromValue(Operator.EQUAL);
  }
}
