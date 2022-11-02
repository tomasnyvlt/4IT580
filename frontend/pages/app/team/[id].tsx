import { gql } from "@apollo/client";
import { Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";

import client from "apollo/client";
import Page from "components/layouts/Page";
import { Team as TeamProps } from "components/types/graphql";

interface TeamDetailPageProps {
  team: TeamProps;
}

const TeamDetailPage: NextPage<TeamDetailPageProps> = ({ team }) => {
  return (
    <Page>
      <Container maxW="6xl">
        <Heading as="h1">{team.name}</Heading>
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
