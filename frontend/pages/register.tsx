import { Box, Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";

import RegisterForm from "components/forms/Register";
import Landing from "components/layouts/Landing";

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
