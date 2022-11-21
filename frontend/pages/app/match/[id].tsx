import { ParsedUrlQuery } from "querystring";

import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";

import client from "apollo/client";
import CreateMatchForm from "components/forms/CreateMatch";
import AuthorizedPage from "components/layouts/AuthorizedPage";
import MatchDone from "components/matches/MatchDone";
import WatchPage from "components/matches/WatchPage";
import { Match, MatchDetailDocument } from "types/generated-types";

interface MatchDetailPageProps {
  match: Match;
}

const MatchDetailPage: NextPage<MatchDetailPageProps> = ({ match }) => {
  console.log(match);

  return (
    <AuthorizedPage>
      <Box bg="blue.400" py="3rem">
        <Container maxW="6xl" gap="3rem" display="flex" flexDirection="column">
          <Flex gap="1rem" alignItems="center">
            <Heading as="h1" color="#fff">
              Zápas {match.id_match}
            </Heading>
          </Flex>
        </Container>
      </Box>

      <Container maxW="6xl" gap="3rem">
        <Box py="3rem">
          {
            {
              pending: <CreateMatchForm match={match} />,
              running: <WatchPage />,
              done: <MatchDone match={match} />,
              accepted: <Box />
            }[match.state]
          }
        </Box>
      </Container>
    </AuthorizedPage>
  );
};

export default MatchDetailPage;

export async function getServerSideProps({ params }: { params: ParsedUrlQuery }) {
  const { data } = await client.query({
    query: MatchDetailDocument,
    variables: {
      id: Number(params.id)
    }
  });

  return {
    props: {
      match: data.match
    }
  };
}
