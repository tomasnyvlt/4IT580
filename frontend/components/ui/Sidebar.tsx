import { Box, Button } from "@chakra-ui/react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import { UserContext } from "components/contexts/UserContext";
import { useMutation } from "components/hooks/useMutation";
import { LOGOUT_MUTATION } from "components/mutations/logout";
import { AUTH_TOKEN, REFRESH_TOKEN } from "config";

const Sidebar: FC = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const [logout] = useMutation(LOGOUT_MUTATION, {
    variables: {
      userId: jwtDecode<JwtPayload & { id_user: string }>(authContext?.tokens?.accessToken as string).id_user ?? ""
    },
    onCompleted: () => {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      authContext?.setTokens?.({ accessToken: "", refreshToken: "" });
      router.push("/");
    }
  });

  return (
    <Box w="300px" h="100%" flex="0 0 auto" borderRight="1px solid" borderColor="gray.400">
      <Box display="flex" gap="1rem" pt="5rem">
        <Link href="/app/" passHref>
          <Button as="a" variant="outline" w="100%">
            Detail týmu
          </Button>
        </Link>
      </Box>

      <Box display="flex" gap="1rem" py="5rem">
        <Button as="a" variant="outline" w="100%" onClick={() => logout()}>
          Logout {userContext.user?.email}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
