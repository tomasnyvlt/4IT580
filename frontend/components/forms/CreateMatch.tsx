import { Box, Button, Checkbox, Container, Flex, Heading, Select, Stack } from "@chakra-ui/react";

import { createColumnHelper } from "@tanstack/table-core";
import { UserContext } from "components/contexts/UserContext";
import Link from "next/link";

// import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";

import InputField from "../../shared/hook-form/FormField";
import DataTable from "../ui/DataTable";

interface PlayerProps {
  id_user: number;
  firstName: string;
  lastName: string;
}

type Team = {
  id_team: string;
  name: string;
  players: Array<PlayerProps>;
  selectedPlayers: Record<string, boolean>;
  goalKeeper: Record<string, boolean>;
};

type MatchInputs = {
  id_match: number;
  teams: Array<Team>;
};

const CreateMatchForm: FC = () => {
  const { user } = useContext(UserContext);

  const methods = useForm<MatchInputs>({
    defaultValues: {
      teams: [
        {
          id_team: "",
          name: "",
          selectedPlayers: {},
          goalKeeper: {}
        },
        {
          id_team: "",
          name: "",
          selectedPlayers: {},
          goalKeeper: {}
        }
      ]
    }
  });

  const { handleSubmit, reset, watch, control } = methods;

  const { fields } = useFieldArray({
    name: "teams",
    control
  });

  const onSubmit = (data: MatchInputs) => {
    console.log(
      "id_team",
      data.teams.map((team) => team.id_team),
      "selectedPlayers",
      data.teams.map((team) =>
        Object.keys(team.selectedPlayers).filter((key) => {
          return team.selectedPlayers[key];
        })
      ),
      "goalKeeper",
      data.teams.map((team) =>
        Object.keys(team.goalKeeper).filter((key) => {
          return team.goalKeeper[key];
        })
      )
    );
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h3" size="md" textAlign="center" m="2rem">
          Vyber si tym
        </Heading>

        {user?.user.teams && user?.user.teams.length > 0 ? (
          <Container maxW="6xl">
            <Flex flexDir="column" gap="1rem">
              {fields.map((field, index) => {
                const selectedTeam = watch(`teams.${index}.id_team`);
                const userTeam = user!.user.teams.find((team) => team.id_team === Number(selectedTeam));

                const userTeamPlayer: PlayerProps[] =
                  userTeam?.players?.map((player) => {
                    return {
                      firstName: player.firstName,
                      lastName: player.lastName,
                      id_user: player.id
                    };
                  }) ?? [];

                const columnHelper = createColumnHelper<PlayerProps>();

                const playersColumn = [
                  columnHelper.accessor("firstName", {
                    cell: (info) => info.getValue(),
                    header: "jmeno"
                  }),
                  columnHelper.accessor("lastName", {
                    cell: (info) => info.getValue(),
                    header: "prijmeni"
                  }),
                  columnHelper.accessor((row) => row, {
                    cell: (info) => {
                      const player = info.getValue();
                      return (
                        <Controller
                          name={`teams.${index}.selectedPlayers.${player.id_user}`}
                          key={player.id_user}
                          render={({ field: fieldProp }) => {
                            return (
                              <Checkbox
                                isChecked={fieldProp.value}
                                onChange={(event) => {
                                  fieldProp.onChange(event.target.checked);
                                }}
                              />
                            );
                          }}
                        />
                      );
                    },
                    header: "Bude hrat"
                  }),
                  columnHelper.accessor((row) => row, {
                    cell: (info) => {
                      const player = info.getValue();
                      return (
                        <Controller
                          name={`teams.${index}.goalKeeper.${player.id_user}`}
                          key={player.id_user}
                          render={({ field: fieldProp }) => (
                            <Checkbox
                              isChecked={fieldProp.value}
                              onChange={(event) => {
                                fieldProp.onChange(event.target.checked);
                              }}
                            />
                          )}
                        />
                      );
                    },
                    header: "Brankar"
                  })
                ];
                return (
                  <>
                    <InputField key={field.id} name={`teams.${index}.id_team`} Component={Select}>
                      <option key={field.toString()} value="" disabled>
                        Tady jsou tymy
                      </option>
                      {user.user.teams.map((team) => (
                        <option key={team.id_team} value={Number(team.id_team)}>
                          {team.name}
                        </option>
                      ))}
                    </InputField>
                    {selectedTeam && <DataTable columns={playersColumn} data={userTeamPlayer} />}
                  </>
                );
              })}
            </Flex>
          </Container>
        ) : (
          <Box />
        )}
        <Stack flexDir="row" justifyContent="space-between" m="1rem">
          <Button type="submit" mt="0.5rem">
            Ulozit
          </Button>
          <Link href="/app/matches/start">
            <Button type="submit">Ulozit a zahajit</Button>
          </Link>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default CreateMatchForm;
