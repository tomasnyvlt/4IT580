import { Box, Button, Checkbox, Container, Flex, Heading, Select, Stack } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/table-core";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";

import { UserContext } from "components/contexts/UserContext";
import { Match, useMatchAddMutation } from "types/generated-types";

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
  players?: Array<PlayerProps>;
  selectedPlayers: Record<string, boolean>;
  goalKeeper: Record<string, boolean>;
};

type MatchInputs = {
  id_match: number;
  teams: Array<Team>;
};

interface CreateMatcgFormProps {
  match?: Match;
}

const CreateMatchForm: FC<CreateMatcgFormProps> = ({ match }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const methods = useForm<MatchInputs>({
    defaultValues: {
      teams: [
        {
          id_team: match?.teams?.[0]?.id_team?.toString() ?? "",
          name: match?.teams?.[0]?.name ?? "",
          // selectedPlayers: match?.teams?.[0]?.players ?? [],
          goalKeeper: {}
        },
        {
          id_team: match?.teams?.[1]?.id_team?.toString() ?? "",
          name: match?.teams?.[1]?.name ?? "",
          // selectedPlayers: match?.teams?.[1]?.players ?? [{}],
          goalKeeper: {}
        }
      ]
    }
  });

  const { handleSubmit, reset, watch, control } = methods;

  const { fields } = useFieldArray({
    name: "teams",
    control
  } as any);

  const [matchAdd] = useMatchAddMutation({
    variables: {},
    onCompleted: (data) => router.push(`/app/match/${data.addMatch.id_match}`)
  });

  const onSubmit = (data: MatchInputs) => {
    if (match) {
      console.log("edit mutace");
    } else {
      matchAdd();
    }

    console.log(
      "id_team",
      data.teams.map((team) => team.id_team),
      "selectedPlayers",
      data.teams.map((team) =>
        Object.keys(team.selectedPlayers).filter((_, index) => {
          return team.selectedPlayers[index];
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
          Vyber týmy a hráče
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
                    header: "Jméno"
                  }),
                  columnHelper.accessor("lastName", {
                    cell: (info) => info.getValue(),
                    header: "Příjmení"
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
                    header: "Bude hrát"
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
                    header: "Brankář"
                  })
                ];
                return (
                  <>
                    <InputField key={field.id} name={`teams.${index}.id_team`} Component={Select}>
                      <option key={field.toString()} value="" disabled>
                        Tým {index === 0 ? "domácí" : "hosté"}
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
            Uložit zápas
          </Button>

          {match && <Button type="submit">Uložit a zahájit</Button>}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default CreateMatchForm;
