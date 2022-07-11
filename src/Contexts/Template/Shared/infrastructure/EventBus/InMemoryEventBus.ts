import {EventBus} from "../../domain/EventBus";
import {DomainEvent} from "../../domain/DomainEvent";

export class InMemoryEventBus implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    console.log("publishing events: ", events);
  }

}
