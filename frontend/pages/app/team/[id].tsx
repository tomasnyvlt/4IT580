import { ParsedUrlQuery } from "querystring";

import { gql } from "@apollo/client";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Avatar, Box, Container, Flex, Heading, Icon, Image, Select, SimpleGrid, Text, chakra } from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createColumnHelper } from "@tanstack/table-core";
import { NextPage } from "next";
import { useState } from "react";

import client from "apollo/client";
import Basic from "components/cards/Basic";
import AuthorizedPage from "components/layouts/AuthorizedPage";
import DataTable from "components/ui/DataTable";
import { Team as TeamProps, TeamDetailDocument } from "types/generated-types";

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

const fakePlayersData2021: PlayerProps[] = [...Array(12)].map((_, index) => {
  return {
    name: `${index} Honza Bílý`,
    role: "Obrana",
    gamesPlayed: 1,
    gol: 2,
    assistance: 8,
    canadianGols: 10,
    averageCanadianGols: 2,
    pinalityMinutes: 4,
    season: "2020-2021"
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
    season: "2021-2022"
  };
});

const fakePlayersData = [...fakePlayersData2021, ...fakePlayersData2022];

const columnHelper = createColumnHelper<PlayerProps>();

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

const seasons = ["2020-2021", "2021-2022"];

const TeamDetailPage: NextPage<TeamDetailPageProps> = ({ team }) => {
  const [option, setOption] = useState(" ");

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
                  Počet členů: <strong>8</strong>
                </Text>
                <Text>
                  Datum založení: <strong>20. 12. 2011</strong>
                </Text>
                <Text>
                  Počet vyhraných zápasů: <chakra.strong color="green.400">10</chakra.strong>
                </Text>
                <Text>
                  Počet prohraných zápasů: <chakra.strong color="red.400">0</chakra.strong>
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
                  <Text>+420123412435</Text>
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
            {seasons.map((season) => {
              return (
                <option key={season.toString()} value={season} selected>
                  {season}
                </option>
              );
            })}
          </Select>
        </Basic>

        <Basic heading="Statistiky" withBackground>
          <DataTable
            columns={playersColumn}
            data={fakePlayersData.filter((data) => {
              return option === " " ? data : data.season === option;
            })}
          />
        </Basic>

        <Basic heading="Statistiky týmu" withBackground />
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
