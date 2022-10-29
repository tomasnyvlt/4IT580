import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

import Footer from "components/ui/Footer";

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="row" minHeight="100vh">
      <Box w="300px" flex="0 0 auto" borderRight="1px solid" borderColor="gray.400">
        sidebar
      </Box>

      <Box display="flex" flexDirection="column" w="100%">
        <Box position="relative" flex="1">
          <Box>{children}</Box>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default Page;
