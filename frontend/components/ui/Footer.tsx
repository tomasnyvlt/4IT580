import { Box, Container, Text } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box py={{ base: "1rem", sm: "2rem" }}>
      <Container maxW="6xl">
        <Text>&copy; {new Date(Date.now()).getFullYear()} Sportify</Text>
      </Container>
    </Box>
  );
};

export default Footer;
