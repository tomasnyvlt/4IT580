export type parentUser = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  timeRegistered: string;
  timeLastLogin: string;
};
export const userTeams = async (
  parent: parentUser,
  _: void,
  context: Context
) => {
  console.log(parent);
  const teams = await context.prisma.team.findMany({
    where: {
      team_has_players: {
        some: {
          id_user: parent.id,
        },
      },
    },
  });
  return teams.slice(0, 20);
};
