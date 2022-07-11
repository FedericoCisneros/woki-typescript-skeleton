import {Collection, Document, MongoClient} from 'mongodb';
import {AggregateRoot} from '../../../domain/AggregateRoot';
import {Criteria} from '../../../domain/criteria/Criteria';
import {Operator} from '../../../domain/criteria/FilterOperator';
import {Filter} from '../../../domain/criteria/Filter';

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<MongoClient>) {
  }

  protected abstract moduleName(): string;

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(collectionName?: string): Promise<Collection> {
    const client = await this.client();
    return client.db().collection(collectionName || this.moduleName());
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();

    const document = {...aggregateRoot.toPrimitives(), _id: id, id: undefined};

    await collection.updateOne({_id: id}, {$set: document}, {upsert: true});
  }

  protected applyCriteria(criteria: Criteria): Document[] {
    const pipeline: Document[] = [];
    const filters: Document = {$match: {}};

    criteria.filters.filters.forEach(filter => {
      filters.$match[filter.field.value] = this.applyFilter(filter);
    });

    pipeline.push(filters);

    if (criteria.orders) {
      const sort: Document = {$sort: {}};
      criteria.orders?.orders.forEach(order => {
        sort.$sort[order.orderBy.value] = order.orderType.value === 'asc' ? 1 : -1;
      });
      pipeline.push(sort);
    }

    return pipeline;
  }

  protected applyFilter(filter: Filter): Document {
    switch (filter.operator.value) {
      case Operator.EQUAL:
        return filter.value.getValue();
      case Operator.NOT_EQUAL:
        return {$ne: filter.value.getValue()};
      case Operator.GT:
        return {$gt: filter.value.getValue()};
      case Operator.GT_OREQUAL:
        return {$gte: filter.value.getValue()};
      case Operator.LT:
        return {$lt: filter.value.getValue()};
      case Operator.LT_OREQUAL:
        return {$lte: filter.value.getValue()};
      case Operator.ARRAY_CONTAINS:
        return {$in: [filter.value.getValue()]};
      case Operator.ARRAY_CONTAINS_ANY:
        return {$in: [filter.value.getValue()]};
      case Operator.IN:
        return {$in: [filter.value.getValue()]};
      case Operator.NOT_IN:
        return {$nin: [filter.value.getValue()]};
    }
  }
}
