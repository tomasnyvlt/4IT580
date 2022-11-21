import { ParsedUrlQuery } from "querystring";

import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Select,
  SimpleGrid,
  Text,
  chakra
} from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createColumnHelper } from "@tanstack/table-core";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

import client from "apollo/client";
import Basic from "components/cards/Basic";
import AuthorizedPage from "components/layouts/AuthorizedPage";
import DataTable from "components/ui/DataTable";
import config from "config";
import { Match, TeamDetailDocument, Team as TeamProps } from "types/generated-types";

interface TeamDetailPageProps {
  team: TeamProps;
}

interface PlayerProps {
  name: string;
  gamesPlayed: number;
  gol: number;
  assistance: number;
  canadianGols: number;
  averageCanadianGols: number;
  pinalityMinutes: number;
  role: "Brankář" | "Obrana" | "Útok";
  season: string;
}

const fakePlayersData2023: PlayerProps[] = [...Array(12)].map((_, index) => {
  return {
    name: `${index} Honza Bílý`,
    role: "Obrana",
    gamesPlayed: 1,
    gol: 2,
    assistance: 8,
    canadianGols: 10,
    averageCanadianGols: 2,
    pinalityMinutes: 4,
    season: "s2023"
  };
});

const fakePlayersData2022: PlayerProps[] = [...Array(12)].map((_, index) => {
  return {
    name: `${index} Honza Černý`,
    role: "Obrana",
    gamesPlayed: 2,
    gol: 3,
    assistance: 3,
    canadianGols: 6,
    averageCanadianGols: 2,
    pinalityMinutes: 3,
    season: "s2022"
  };
});

const fakePlayersData = [...fakePlayersData2023, ...fakePlayersData2022];

const columnHelper = createColumnHelper<PlayerProps>();
const matchesColumnHelper = createColumnHelper<Match>();

const matchesColumns = [
  matchesColumnHelper.accessor("id_match", {
    cell: (info) => info.getValue(),
    header: "ID"
  }),
  matchesColumnHelper.accessor("teams", {
    cell: (info) => info.getValue()?.[0]?.name,
    header: "Domácí"
  }),
  matchesColumnHelper.accessor("teams", {
    cell: (info) => info.getValue()?.[1]?.name,
    header: "Hosté"
  }),
  matchesColumnHelper.accessor("score", {
    cell: (info) => `${info.getValue()?.[0]?.points} : ${info.getValue()?.[1]?.points}`,
    header: "Skóre"
  }),
  matchesColumnHelper.accessor("state", {
    cell: (info) => info.getValue(),
    header: "Stav zápasu"
  }),
  matchesColumnHelper.display({
    id: "actions",
    cell: (props) => (
      <Flex justifyContent="flex-end">
        <Link passHref href={`/app/match/${props.row.original.id_match}`}>
          <Button as="a">Detail</Button>
        </Link>
      </Flex>
    )
  })
];

const playersColumn = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Hráč"
  }),
  columnHelper.accessor("role", {
    cell: (info) => info.getValue(),
    header: "Pozice"
  }),
  columnHelper.accessor("gamesPlayed", {
    cell: (info) => info.getValue(),
    header: "GP"
  }),
  columnHelper.accessor("gol", {
    cell: (info) => info.getValue(),
    header: "G"
  }),
  columnHelper.accessor("assistance", {
    cell: (info) => info.getValue(),
    header: "A"
  }),
  columnHelper.accessor("canadianGols", {
    cell: (info) => info.getValue(),
    header: "KG"
  }),
  columnHelper.accessor("averageCanadianGols", {
    cell: (info) => info.getValue(),
    header: "AvgKG"
  }),
  columnHelper.accessor("pinalityMinutes", {
    cell: (info) => info.getValue(),
    header: "PIM"
  }),
  columnHelper.accessor("season", {
    cell: (info) => info.getValue(),
    header: "Sezóna"
  })
];

const TeamDetailPage: NextPage<TeamDetailPageProps> = ({ team }) => {
  const [option, setOption] = useState("s2023");

  console.log(team.matches?.filter((match) => match?.season === option));

  return (
    <AuthorizedPage>
      <Box bg="blue.400" py="3rem">
        <Container maxW="6xl" gap="3rem" display="flex" flexDirection="column">
          <Flex gap="1rem" alignItems="center">
            <Avatar size="md" name={team.name ?? "T"} {...(team.image_url && { src: team.image_url })} />
            <Heading as="h1" color="#fff">
              {team.name}
            </Heading>
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 3 }} gap="1rem">
            <Basic heading="Základní informace">
              <Flex flexDirection="column" gap="0.5rem">
                <Text>
                  Počet členů: <strong>{team.players.length}</strong>
                </Text>
                <Text>
                  Datum založení: <strong>-</strong>
                </Text>
                <Text>
                  Počet vyhraných zápasů: <chakra.strong color="green.400">-</chakra.strong>
                </Text>
                <Text>
                  Počet prohraných zápasů: <chakra.strong color="red.400">-</chakra.strong>
                </Text>
              </Flex>
            </Basic>

            <SimpleGrid columns={1} gap="1rem">
              <Basic heading="Typ týmu">Amatérský</Basic>

              <Basic heading="Sport">
                <Flex gap="0.5rem" alignItems="center">
                  <Image w="1rem" h="1rem" src="/static/images/hokey.png" alt="hokey-icon" />
                  <Text>Hokej</Text>
                </Flex>
              </Basic>
            </SimpleGrid>

            <Basic heading="Kontaktní osoba týmu">
              <Flex flexDirection="column" gap="0.5rem">
                <Flex flexDirection="row" alignItems="center" gap="1rem">
                  <Avatar size="sm" name="Jan Novak" bg="blue.400" />
                  <Text fontWeight={700}>Jan Novak</Text>
                </Flex>
                <Flex gap="1rem" alignItems="center">
                  <Flex alignItems="center" justifyContent="center" w="8" h="8" bg="blue.400" borderRadius="50">
                    <Icon as={PhoneIcon} color="#fff" />
                  </Flex>
                  <Text>+420 123 412 435</Text>
                </Flex>
                <Flex gap="1rem" alignItems="center">
                  <Flex alignItems="center" justifyContent="center" w="8" h="8" bg="blue.400" borderRadius="50">
                    <Icon as={EmailIcon} color="#fff" />
                  </Flex>
                  <Text>jan.novak@seznam.cz</Text>
                </Flex>
              </Flex>
            </Basic>
          </SimpleGrid>
        </Container>
      </Box>

      <Container maxW="6xl" gap="3rem" display="flex" flexDirection="column" mt="6rem">
        <Basic heading="Sezóny" withBackground>
          <Select value={option} onChange={(e) => setOption(e.target.value)}>
            {config.seasons.map((season) => {
              return (
                <option key={season.toString()} value={season} selected>
                  {season}
                </option>
              );
            })}
          </Select>
        </Basic>

        {team.matches?.filter((match) => match?.season === option)?.length! > 0 ? (
          <Basic heading="Seznam zápasů" withBackground>
            <DataTable
              columns={matchesColumns}
              data={team.matches?.filter((match) => match && match?.season === option) as Match[]}
            />
          </Basic>
        ) : (
          <Text>Pro tuto sezónu nejsou žádné zápasy.</Text>
        )}

        <Basic heading="Statistiky" withBackground>
          <DataTable
            columns={playersColumn}
            data={fakePlayersData.filter((data) => {
              return option === " " ? data : data.season === option;
            })}
          />
        </Basic>
      </Container>
    </AuthorizedPage>
  );
};

export default TeamDetailPage;

export async function getServerSideProps({ params }: { params: ParsedUrlQuery }) {
  const { data } = await client.query({
    query: TeamDetailDocument,
    variables: {
      id: Number(params.id)
    }
  });

  return {
    props: {
      team: data.team
    }
  };
}
