import { ArrowLeftIcon, ArrowRightIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import { UserContext } from "components/contexts/UserContext";
import { useMutation } from "components/hooks/useMutation";
import { LOGOUT_MUTATION } from "components/mutations/logout";
import NavItem from "components/sidebar/NavItem";
import { AUTH_TOKEN, REFRESH_TOKEN } from "config";

const Sidebar: FC = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const [navSizes, setNavsize] = useState("large");

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
      <Flex
        position="sticky"
        left="5"
        h="95Vh"
        mt="2.5vh"
        boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
        width={navSizes === "small" ? "140px" : "300px"}
        borderRadius={navSizes === "small" ? "15px" : "30px"}
      >
        <Flex flexDirection="column">
          <Box p="15px">
            <Avatar size="md" src="/static/images/8_big16.png" onClick={() => alert("bla")} />
          </Box>
        </Flex>

        <Flex flexDirection="column" justifyContent="space-between" w="100%">
          <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mt="4" align="center">
            {/* <Divider display={navSizes === "small" ? "none" : "float"} /> */}
            <Flex mt="4" align="center">
              {/* <Avatar size="sm" src="/static/images/8_big16.png" onClick={() => alert("bla")} /> */}
              <Flex flexDir="column" ml="4" display={navSizes === "small" ? "none" : "float"}>
                <Heading as="h3">Tigers</Heading>
              </Flex>
            </Flex>
            <NavItem navSizes={navSizes} icon={InfoOutlineIcon} title="Detail tymu" href="/app/team-detail" active />
            <NavItem navSizes={navSizes} icon={InfoOutlineIcon} title="Ligy" href="/app/team-detail" />
            <NavItem navSizes={navSizes} icon={InfoOutlineIcon} title="Matches" href="/app/team-detail" />
          </Flex>
          <Flex p="5%" flexDir="column" alignItems="flex-end" as="nav">
            <IconButton
              background="none"
              mt="5"
              _hover={{ background: "none" }}
              icon={navSizes === "large" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
              onClick={() => {
                if (navSizes === "small") {
                  setNavsize("large");
                } else {
                  setNavsize("small");
                }
              }}
              aria-label="hamburger menu"
            />
          </Flex>
        </Flex>
      </Flex>

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
