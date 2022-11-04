import { GQLError } from "../../utils/return_statements/errors.js";
import { deleteTeamArgs } from "./mutation.js";

export const teams = async (_: void, __: void, context: Context) => {
  const teams = await context.prisma.team.findMany();
  if (teams.length < 1) {
    throw new GQLError().noMatches();
  }
  return teams.slice(0, 20);
};

export type teamArgs = deleteTeamArgs;
export const team = async (_: void, args: teamArgs, context: Context) => {
  return await context.prisma.team.findUnique({
    where: {
      id_team: args.id_team,
    },
  });
};
