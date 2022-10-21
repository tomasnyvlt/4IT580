import { Container, Text, Link, Heading, Box } from "@chakra-ui/react";
import SignInForm from "components/forms/SignIn";
import Landing from "components/layouts/Landing";
import { NextPage } from "next";

const SignInPage: NextPage = () => {
  return (
    <Landing>
      <Container>
        <Heading as="h1" textAlign="center" mt="6rem">Přihlášení</Heading>

        <Box maxW="20rem" mx="auto" mt="6rem">
          <SignInForm />
        </Box>

        <Text textAlign="center" mt="6rem">Nemáte ještě účet? <Link color='teal.500' href="/register">Vytvořte si ho</Link>.</Text>
      </Container>
    </Landing>
  )
};

export default SignInPage;
