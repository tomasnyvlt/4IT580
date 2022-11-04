import { typeDef } from './schema.js';
import * as queries from './query.js';
import { IResolvers } from "@graphql-tools/utils";
import * as mutations from './mutation.js';
import * as eventSpecific from './event_specific.js';

const resolvers: IResolvers<any, Context> = {
  Query: { ...queries },
  Mutation: { ...mutations },
  Event: {
    match: eventSpecific.match,
    eventType: eventSpecific.eventType,
    user: eventSpecific.user,
    counterEvent: eventSpecific.counterEvent
  }
};

export { typeDef, resolvers };
