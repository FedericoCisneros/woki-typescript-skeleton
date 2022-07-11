import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot {
  private recordedDomainEvents: DomainEvent[] = [];

  public pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.recordedDomainEvents;
    this.recordedDomainEvents = [];
    return domainEvents;
  }

  toJSON(): any {
    return this.toPrimitives();
  }

  abstract toPrimitives(): any;

  protected recordDomainEvent(domainEvent: DomainEvent): void {
    this.recordedDomainEvents.push(domainEvent);
  }
}
