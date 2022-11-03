import { gql } from "@apollo/client";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Avatar, Container, Flex, Heading, Icon, Image, SimpleGrid, Text, chakra } from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createColumnHelper } from "@tanstack/table-core";
import { NextPage } from "next";

import client from "apollo/client";
import Basic from "components/cards/Basic";
import Page from "components/layouts/Page";
import { Team as TeamProps } from "components/types/graphql";
import DataTable from "components/ui/DataTable";

interface TeamDetailPageProps {
  team: TeamProps;
}

interface PlayerProps {
  name: string;
  surname: string;
  role: "Brankář" | "Obrana" | "Útok";
}

const fakePlayersData: PlayerProps[] = [...Array(12)].map((_, index) => {
  return {
    name: `${index} Honza`,
    surname: "Bílý",
    role: "Obrana"
  };
});

const columnHelper = createColumnHelper<PlayerProps>();

const playersColumn = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Jméno"
  }),
  columnHelper.accessor("surname", {
    cell: (info) => info.getValue(),
    header: "Příjmení"
  }),
  columnHelper.accessor("role", {
    cell: (info) => info.getValue(),
    header: "Pozice"
  })
];

const TeamDetailPage: NextPage<TeamDetailPageProps> = ({ team }) => {
  return (
    <Page>
      <Container maxW="6xl" gap="3rem" display="flex" flexDirection="column">
        <Flex gap="1rem" alignItems="center">
          <Avatar size="md" name={team.name ?? "T"} {...(team.image_url && { src: team.image_url })} />
          <Heading as="h1">{team.name}</Heading>
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

        <Basic heading="Soupiska hráčů">
          <DataTable columns={playersColumn} data={fakePlayersData} />
        </Basic>

        <Basic heading="Sezóny" />

        <Basic heading="Statistiky týmu" />
      </Container>
    </Page>
  );
};

export default TeamDetailPage;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Teams {
        team(id_team: 1) {
          id_team
          name
          image_url
          players {
            firstName
          }
          invited_players {
            firstName
          }
          admins {
            firstName
          }
          team_meta_data {
            key
            value
          }
        }
      }
    `
  });

  return {
    props: {
      team: data.team
    }
  };
}
