import { typeDef } from "./schema.js";
import { IResolvers } from "@graphql-tools/utils";
import * as queries from "./query.js";
import * as mutations from "./mutation.js";
import * as leagueSpecific from "./league_specific.js";

const resolvers: IResolvers<any, Context> = {
  Query: { ...queries },
  Mutation: { ...mutations },
  League: {
    admin: leagueSpecific.leagueAdmin,
    teams: leagueSpecific.leagueTeams,
  },
};

export { typeDef, resolvers };
