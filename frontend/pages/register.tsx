import { Container, Heading, Box } from "@chakra-ui/react";
import RegisterForm from "components/forms/Register";
import Landing from "components/layouts/Landing";
import { NextPage } from "next";

const RegisterPage: NextPage = () => {
  return (
    <Landing>
      <Container maxW="700px">
        <Heading as="h2" textAlign="center" mt="3rem" size="md">
          Registrace pomoci emailove adresy
        </Heading>
        <Box mx="auto" mt="2rem">
          <RegisterForm />
        </Box>
      </Container>
    </Landing>
  );
};

export default RegisterPage;
