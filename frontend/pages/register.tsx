import { Box, Container, Heading, Link, Text } from "@chakra-ui/react";
import { NextPage } from "next";

import RegisterForm from "components/forms/Register";
import Landing from "components/layouts/Landing";

const RegisterPage: NextPage = () => {
  return (
    <Landing>
      <Container maxW="700px">
        <Heading as="h1" textAlign="center" mt="6rem">
          Registrace do aplikace Sportify
        </Heading>
        <Box mx="auto" mt="2rem">
          <RegisterForm />
        </Box>
        <Text textAlign="center" mt="6rem">
          Máte už účet?{" "}
          <Link color="teal.500" href="/sign-in">
            Přihlašte se!
          </Link>
        </Text>
      </Container>
    </Landing>
  );
};

export default RegisterPage;
