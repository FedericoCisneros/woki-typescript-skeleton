import {Order} from "./Order";

export class Orders {
  readonly orders: Order[];

  constructor(orders: Order[]) {
    this.orders = orders;
  }
}
