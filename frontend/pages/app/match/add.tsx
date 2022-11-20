import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";

import CreateMatchForm from "components/forms/CreateMatch";
import AuthorizedPage from "components/layouts/AuthorizedPage";

const CreateMatchPage: NextPage = () => {
  return (
    <AuthorizedPage>
      <Box bg="blue.400" py="3rem">
        <Container maxW="6xl" gap="3rem" display="flex" flexDirection="column">
          <Flex gap="1rem" alignItems="center">
            <Heading as="h1" color="#fff">
              Nový zápas
            </Heading>
          </Flex>
        </Container>
      </Box>

      <Container>
        <Container maxW="6xl" gap="3rem">
          <Box py="3rem">
            <CreateMatchForm />
          </Box>
        </Container>
      </Container>
    </AuthorizedPage>
  );
};

export default CreateMatchPage;
