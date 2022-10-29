import { Box } from "@chakra-ui/react";
import { UserContext } from "components/contexts/UserContext";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useContext, useEffect } from "react";

import Footer from "components/ui/Footer";
import Header from "components/ui/Header";

const Landing: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />

      <Box position="relative" flex="1">
        <Box>{children}</Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Landing;
