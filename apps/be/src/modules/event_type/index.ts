import { typeDef } from './schema';
import * as queries from './query';
import { IResolvers } from "@graphql-tools/utils"
import * as mutations from './mutation';

const resolvers: IResolvers<any, Context> = {
  Query: { ...queries },
  Mutation: { ...mutations },
};

export { typeDef, resolvers };
