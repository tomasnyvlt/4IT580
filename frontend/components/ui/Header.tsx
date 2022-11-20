import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Container, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Box as="header" py={{ base: "1rem", sm: "2rem" }} borderBottom="1px solid" borderColor="gray.400">
      <Container maxW="6xl" display="flex" alignItems="center" justifyContent="space-between">
        <Link href="/" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <Image src="/static/images/logo.svg" alt="" width="180" height="40" />
          </a>
        </Link>

        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          variant="outline"
          onClick={() => setMenuOpen((value) => !value)}
          display={{ base: "flex", md: "none" }}
        />

        <Box
          position={{ base: "absolute", md: "static" }}
          top={{ base: "72px", md: 0 }}
          left={0}
          display={{ base: menuOpen ? "flex" : "none", md: "flex" }}
          bg="#fff"
          width={{ base: "100%", md: "auto" }}
          alignItems="center"
          justifyContent="flex-start"
          flexDirection={{ base: "column", md: "row" }}
          pt={{ base: "2rem", md: 0 }}
          height={{ base: "calc(100vh - 73px)", md: "auto" }}
          gap="1rem"
          zIndex={1}
        >
          <Link href="/sign-in" passHref>
            <Button as="a" variant="outline">
              Přihlášení
            </Button>
          </Link>

          <Link href="/register" passHref>
            <Button as="a">Registrace</Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
