import { Box, Button, Container, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <Box py="2rem" borderBottom="1px solid" borderColor="gray.400">
      <Container maxW='6xl' display="flex" alignItems="center" justifyContent="space-between">
        <Image src="/static/images/logo.svg" alt="" width="180" height="40" />

        <Box display="flex" gap="1rem">
          <Link href="/sign-in" passHref>
            <Button as="a" variant='outline'>
              Přihlášení
            </Button>
          </Link>

          <Link href="/register" passHref>
            <Button as="a">
              Registrace
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
};

export default Header;
