import {Filters} from "./Filters";
import {Order} from "./Order";
import {Orders} from "./Orders";
import {Nullable} from "../Nullable";
import {Filter} from "./Filter";

export class Criteria {
  readonly filters: Filters;
  readonly order?: Order;
  readonly orders?: Orders;
  readonly limit?: number;
  readonly offset?: number;

  constructor(params: {
    filters: Filters, order?: Order, limit?: number, offset?: number, orders?: Orders
  }) {
    this.filters = params.filters;
    this.order = params.order;
    this.limit = params.limit;
    this.offset = params.offset;
    this.orders = params.orders;
  }

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }

  public hasFilter(key: string): boolean {
    return this.filters.hasFilter(key);
  }

  getFilter(key: string): Nullable<Filter> {
    return this.filters.getFilter(key);
  }
}
