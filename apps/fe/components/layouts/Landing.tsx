import { Box } from "@chakra-ui/react";
import Footer from "components/ui/Footer";
import Header from "components/ui/Header";
import { FC, PropsWithChildren } from "react";

const Landing: FC<PropsWithChildren> = ({ children }) => {
  return(
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />

      <Box position="relative" flex="1">

        <Box>
          {children}
        </Box>
      </Box>

      <Footer />
    </Box>
  )
};

export default Landing;
