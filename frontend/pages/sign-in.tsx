import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";

import SignInForm from "components/forms/SignIn";
import LandingPage from "components/layouts/LandingPage";
import SportifyLink from "components/ui/SportifyLink";

const SignInPage: NextPage = () => {
  return (
    <LandingPage>
      <Container>
        <Heading as="h1" textAlign="center" mt="6rem">
          Přihlášení do aplikace Sportify
        </Heading>

        <Box maxW="20rem" mx="auto" mt="2rem">
          <SignInForm />
        </Box>

        <Text textAlign="center" mt="6rem">
          Nemáte ještě účet? <SportifyLink href="/register">Zaregistrujte se!</SportifyLink>
        </Text>
      </Container>
    </LandingPage>
  );
};

export default SignInPage;
