import { Container, Heading, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LandingPage from "components/layouts/LandingPage";
import { useConfirmRegMutation } from "types/generated-types";

const ActivationPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [confirmation] = useConfirmRegMutation();

  useEffect(() => {
    if (router.isReady && router.query.confirmationCode) {
      confirmation({
        variables: {
          confirmationCode: router.query.confirmationCode.toString()
        },
        onCompleted: (data) => {
          if (data !== null) {
            toast({
              title: "Úspěšná aktivace, nyní se prosím přihlašte",
              status: "success",
              duration: 5000,
              isClosable: true
            });
            router.push("/sign-in");
          }
        },
        onError: (error) => {
          toast({
            title: error.message,
            status: "error",
            duration: 5000,
            isClosable: true
          });
        }
      });
    }
  }, [router]);

  return (
    <LandingPage>
      <Container maxW="700px">
        <Heading as="h1" textAlign="center" mt="6rem">
          Aktivace účtu
        </Heading>
      </Container>
    </LandingPage>
  );
};

export default ActivationPage;
