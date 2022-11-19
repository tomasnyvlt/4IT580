import { Box, Container, Heading } from "@chakra-ui/react";
import AuthorizedPage from "components/layouts/AuthorizedPage";
import WatchPage from "components/matches/WatchPage";
import { NextPage } from "next";

const StartMatchPage: NextPage = () => {
  return (
    <AuthorizedPage>
      <Container maxW="6xl" gap="3rem">
        <Box py="3rem">
          <Heading textAlign="center">Zapas</Heading>
          <WatchPage />
        </Box>
      </Container>
    </AuthorizedPage>
  );
};

export default StartMatchPage;
