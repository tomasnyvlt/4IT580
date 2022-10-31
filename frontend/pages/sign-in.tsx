import { Box, Container, Heading, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";

import SignInForm from "components/forms/SignIn";
import Landing from "components/layouts/Landing";

const SignInPage: NextPage = () => {
  return (
    <Landing>
      <Container>
        <Heading as="h1" textAlign="center" mt="6rem">
          Přihlášení do aplikace Sportify
        </Heading>

        <Box maxW="20rem" mx="auto" mt="2rem">
          <SignInForm />
        </Box>

        <Text textAlign="center" mt="6rem">
          Nemáte ještě účet?{" "}
          <Link color="teal.500" href="/register">
            Zaregistrujte se!
          </Link>
        </Text>
      </Container>
    </Landing>
  );
};

export default SignInPage;
