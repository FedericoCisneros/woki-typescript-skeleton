import { Filter } from "./Filter";
import {Nullable} from "../Nullable";

export class Filters {
    readonly filters: Filter[];
    constructor(filters: Filter[]) {
      this.filters = filters;
    }

    static fromValues(filters: Array<Map<string, string>>): Filters {
      return new Filters(filters.map(Filter.fromValues));
    }

    static none(): Filters {
      return new Filters([]);
    }

  hasFilter(key: string): boolean {
    return this.filters.length > 0 && this.filters.some(filter => filter.field.value === key);
  }

  getFilter(key: string): Nullable<Filter> {
    return this.filters.find(filter => filter.field.value === key) || null;
  }
}
