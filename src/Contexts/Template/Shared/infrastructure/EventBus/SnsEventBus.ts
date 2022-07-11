import {EventBus} from "../../domain/EventBus";
import {DomainEvent} from "../../domain/DomainEvent";
import {PublishCommand, SNS, SNSClient} from "@aws-sdk/client-sns";

export class SnsEventBus implements EventBus {
  private sns: SNSClient;

  constructor() {
    this.sns = new SNS({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }

  async publish(events: DomainEvent[]): Promise<void> {
    const topicSuffix = process.env.NODE_ENV === "prod" ? "" : `_${process.env.NODE_ENV}`;
    const executions: any = events.map(async (event: DomainEvent) => {
      const params = {
        Message: JSON.stringify(event.toPrimitive()), // MESSAGE_TEXT
        TopicArn: process.env.AWS_BASE_TOPIC_URL + event.eventName + topicSuffix //TOPIC_ARN
      };
      console.log("publishing event - params: ", params);
      const command = new PublishCommand(params);
      return await this.sns.send(command); // For unit tests.
    });

    await Promise.all(executions);
  }
}
