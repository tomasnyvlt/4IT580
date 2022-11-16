import { typeDef } from "./schema.js";
import * as queries from "./query.js";
import { IResolvers } from "@graphql-tools/utils";
import * as mutations from "./mutation.js";
import * as matchSpecific from "./match_specific.js";

const resolvers: IResolvers<any, Context> = {
  Query: { ...queries },
  Mutation: { ...mutations },
  Match: {
    teams: matchSpecific.matchTeams,
    match_editors: matchSpecific.matchEditors,
    events: matchSpecific.matchEvents,
    match_players: matchSpecific.matchPlayers
  },
};

export { typeDef, resolvers };
