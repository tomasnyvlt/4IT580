import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useContext, useEffect } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import { UserContext } from "components/contexts/UserContext";
import Footer from "components/ui/Footer";
import Sidebar from "components/ui/Sidebar";

const Page: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user]);

  if (authContext?.tokens?.accessToken && user) {
    return (
      <Box display="flex" flexDirection="row" minHeight="100vh">
        <Sidebar />

        <Box display="flex" flexDirection="column" w="100%">
          <Box position="relative" flex="1" py="2rem">
            <Box>{children}</Box>
          </Box>

          <Footer />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100vw", height: "100vh" }}>
      <Spinner />
    </Box>
  );
};

export default Page;
