import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

import Footer from "components/ui/Footer";
import Header from "components/ui/Header";

const LandingPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />

      <Box as="main" position="relative" flex="1">
        <Box>{children}</Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
