import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";

import RegisterForm from "components/forms/Register";
import LandingPage from "components/layouts/LandingPage";
import SportifyLink from "components/ui/SportifyLink";

const RegisterPage: NextPage = () => {
  return (
    <LandingPage>
      <Container maxW="700px">
        <Heading as="h1" textAlign="center" mt="6rem">
          Registrace do aplikace Sportify
        </Heading>
        <Box mx="auto" mt="2rem">
          <RegisterForm />
        </Box>
        <Text textAlign="center" mt="6rem">
          Máte už účet? <SportifyLink href="/sign-in">Přihlašte se!</SportifyLink>
        </Text>
      </Container>
    </LandingPage>
  );
};

export default RegisterPage;
