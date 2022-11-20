import { formatPlayer } from "../../utils/format";

export const leagueAdmin = async (
  parent: { id_league: number },
  _: void,
  context: Context
) => {
  const admin = await context.prisma.user.findFirst({
    where: {
      league_has_administrator: {
        some: {
          id_league: parent.id_league,
        },
      },
    },
  });
  return admin === null ? null : formatPlayer(admin);
};

export const leagueTeams = async (
  parent: { id_league: number },
  _: void,
  context: Context
) => {
  const teams = await context.prisma.team.findMany({
    where: {
      league_has_team: {
        some: {
          id_league: parent.id_league,
        },
      },
    },
  });
  console.log(teams);
  return teams;
};
