import { Box, Container, Text } from "@chakra-ui/react";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <Box py="2rem" borderTop="1px solid" borderColor="gray.400">
      <Container maxW="6xl">
        <Text>&copy; {new Date(Date.now()).getFullYear()} Sportify</Text>
      </Container>
    </Box>
  );
};

export default Footer;
