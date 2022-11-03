import { GQLSuccess } from "../../utils/return_statements/success";

type leagueArgs = {
  name: string;
  description: string | undefined;
  image_url: string;
};
export const addLeague = async (
  _: void,
  args: leagueArgs,
  context: Context
) => {
  return await context.prisma.league.create({
    data: args,
  });
};

export const deleteLeague = async (
  _: void,
  args: { id_league: number },
  context: Context
) => {
  await context.prisma.league.delete({
    where: {
      id_league: args.id_league,
    },
  });
  return new GQLSuccess().rowDeleted();
};

type updateLeagueArgs = {
  id_league: number;
  name: string | undefined;
  description: string | undefined;
  image_url: string | undefined;
};
export const updateLeague = async (
  _: void,
  args: updateLeagueArgs,
  context: Context
) => {
  return await context.prisma.league.update({
    where: {
      id_league: args.id_league,
    },
    data: {
      name: args?.name,
      description: args?.description,
      image_url: args?.image_url,
    },
  });
};
