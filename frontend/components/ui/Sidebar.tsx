import { ArrowLeftIcon, ArrowRightIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Button,
  Flex,
  Heading,
  IconButton,
  Text
} from "@chakra-ui/react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import Image from "next/image";
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
  const { user } = useContext(UserContext);
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [bigSize, setBigSize] = useState<boolean>(true);

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
    <Flex
      w="300px"
      h="100vh"
      flex="0 0 auto"
      boxShadow="basic"
      flexDirection="column"
      width={bigSize ? "18.75rem" : "8.75rem"}
      borderRadius={!bigSize ? "15px" : "30px"}
      position="sticky"
      top={0}
      display={{ base: "none", sm: "flex" }}
    >
      <Flex w="100%" p="1rem">
        <Image src="/static/images/logo.svg" alt="" width="180" height="40" />
      </Flex>

      <IconButton
        background="none"
        position="absolute"
        top="50%"
        p="1rem"
        transform="translateY(-50%)"
        right={0}
        _hover={{ background: "none" }}
        icon={bigSize ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        transition="background 300ms"
        // onClick={() => setBigSize((size) => !size)}
        aria-label="hamburger menu"
      />

      <Flex flexDirection="column" h="100%">
        <Heading as="h3" size="md" mt="4rem" px="1rem">
          Moje týmy
        </Heading>

        {user?.teams && user?.teams.length > 0 ? (
          <Accordion mt="1rem">
            {user?.teams?.map((team) => (
              <AccordionItem key={team.id_team}>
                <AccordionButton>
                  <Flex flex="1" textAlign="left" alignItems="center">
                    <Avatar
                      size="md"
                      name={team.name ?? "T"}
                      {...(team.image_url && { src: team.image_url })}
                      mr="1rem"
                    />
                    <strong>{team.name}</strong>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <NavItem
                    isBig={bigSize}
                    icon={InfoOutlineIcon}
                    title="Detail týmu"
                    href={{
                      pathname: "/app/team/[id]",
                      query: { id: team.id_team }
                    }}
                    active={router.asPath === `/app/team/${team.id_team}`}
                  />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Text mt="1rem" px="1rem">
            Zatím nehrajete v žádném týmu.
          </Text>
        )}
      </Flex>

      <Flex gap="1rem" p="1rem">
        <Avatar
          name={`${user?.userName} ${user?.lastName}`}
          size="md"
          bg="blue.400"
          color="#fff"
          onClick={() => alert("Detail usera (změna hesla, odhlásit, atd.)")}
        />

        <Flex>
          {user?.firstName} {user?.lastName}
          <br />
          {user?.email}
        </Flex>
      </Flex>
      <Button as="a" cursor="pointer" variant="outline" w="100%" onClick={() => logout()} mb="1rem">
        Logout
      </Button>
    </Flex>
  );
};

export default Sidebar;
