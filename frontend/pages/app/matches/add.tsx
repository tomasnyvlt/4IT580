import { Box, Container, Heading } from "@chakra-ui/react";
import CreateMatchForm from "components/forms/CreateMatch";
import AuthorizedPage from "components/layouts/AuthorizedPage";
import { NextPage } from "next";

const CreateMatchPage: NextPage = () => {
  return (
    <AuthorizedPage>
      <Container maxW="6xl" gap="3rem">
        <Box py="3rem">
          <Heading textAlign="center">Vytvorit novy zapas</Heading>
          <CreateMatchForm />
        </Box>
      </Container>
    </AuthorizedPage>
  );
};

export default CreateMatchPage;
