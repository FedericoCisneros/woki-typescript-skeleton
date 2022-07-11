export abstract class ArrayValueObject<T> {
  readonly value: T[];

  protected constructor(value: T[]) {
    this.value = [...value];
  }

  protected add(value: T): void {
    this.value.push(value);
  }

  public equalTo(other: T[]) {
    return this.value.every((v, i) => v === other[i]);
  }

  protected remove(value: T): void {
    const index = this.value.findIndex(v => v === value);
    if (index === -1) {
      throw new Error("No existe el elemento en el arreglo");
    }
    this.value.splice(index, 1);
  }
}
