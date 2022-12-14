import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";

import { AuthContext } from "components/contexts/AuthContext";
import { UserContext } from "components/contexts/UserContext";
import NavItem from "components/sidebar/NavItem";
import { AUTH_TOKEN, REFRESH_TOKEN } from "config";
import { useLogoutMutation } from "types/generated-types";

const Sidebar: FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [bigSize, setBigSize] = useState<boolean>(true);

  const [logout] = useLogoutMutation({
    onCompleted: () => {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      authContext?.setTokens?.({ accessToken: "", refreshToken: "" });
      router.push("/");
    }
  });

  return (
    <Flex
      as="aside"
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
        <Heading as="h3" size="md" mt="4rem" px="1rem" mb="1rem">
          Moje t??my
        </Heading>

        {user?.user.teams && user?.user.teams.length > 0 ? (
          <Box>
            {user?.user.teams?.map((team) => (
              <NavItem
                key={team.id_team}
                title={team.name ?? ""}
                href={{
                  pathname: "/app/team/[id]",
                  query: { id: team.id_team }
                }}
                avatar={
                  <Avatar
                    size="md"
                    name={team.name ?? "T"}
                    {...(team.image_url && { src: team.image_url })}
                    mr="1rem"
                  />
                }
                active={router.asPath === `/app/team/${team.id_team}`}
              />
            ))}
          </Box>
        ) : (
          <Text mt="1rem" px="1rem">
            Zat??m nehrajete v ????dn??m t??mu.
          </Text>
        )}

        <Heading as="h3" size="md" mt="4rem" px="1rem" mb="1rem">
          Z??pasy
        </Heading>

        <NavItem href="/app/match/add" title="P??idat z??pas" icon={AddIcon} />
        {/*
        <NavItem href="#" title="P??ehled z??pas??" icon={ViewIcon} />
        */}
      </Flex>

      <Flex gap="1rem" p="1rem">
        <Avatar
          name={`${user?.user.firstName} ${user?.user.lastName}`}
          size="md"
          bg="blue.400"
          color="#fff"
          onClick={() => alert("Detail usera (zm??na hesla, odhl??sit, atd.)")}
        />

        <Flex>
          {user?.user.firstName} {user?.user.lastName}
          <br />
          {user?.user.email}
        </Flex>
      </Flex>
      <Button as="a" cursor="pointer" variant="outline" w="100%" onClick={() => logout()} mb="1rem">
        Odhl??sit se
      </Button>
    </Flex>
  );
};

export default Sidebar;
