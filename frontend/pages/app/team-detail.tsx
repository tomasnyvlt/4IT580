import { SearchIcon, PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Image,
  Text,
  Avatar
} from "@chakra-ui/react";
import { NextPage } from "next";

import Page from "../../components/layouts/Page";
import SeasonTable from "../../components/teams/SeasonTable";
import TeamInfo from "../../components/teams/TeamInfo";
import TeamTable from "../../components/teams/TeamTable";

const TeamDetailPage: NextPage = () => {
  return (
    <Page>
      <Flex flexDir="column" p="55px">
        <Flex flexDir="row" h="50px" mb="50px" justifyContent="space-between">
          <Box w="45%">
            <Heading textAlign="center"> Vitejte zpatky Tigers</Heading>
          </Box>
          <InputGroup w="30%">
            <InputRightElement pointerEvents="none">
              <SearchIcon />
            </InputRightElement>
            <Input placeholder="hledat" />
          </InputGroup>
        </Flex>
        <Flex flexDir="row" justifyContent="space-between" ml="10px">
          <Flex
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            p="15px"
            mb="30px"
            borderRadius="10px"
            w="350px"
            h="200px"
            _hover={{ backgroundColor: "blue", color: "white" }}
          >
            <Image w="170px" h="120px" src="/static/images/8_big16.png" borderRadius="10px" alt="team-icon" />
            <Heading as="h2" size="xl" pl="10px" textAlign="center">
              Jsme Tigers
            </Heading>
          </Flex>

          <Flex
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            p="15px"
            borderRadius="10px"
            w="200px"
            flexDir="column"
            alignContent="space-between"
            h="200px"
            _hover={{ backgroundColor: "blue", color: "white" }}
          >
            <Flex p="15px">
              <Image w="30px" h="30px" src="/static/images/sports.png" borderRadius="10px" alt="sport-icon" />
              <Text size="xl" pl="10px" textAlign="center" color="gray.600">
                My hrajeme
              </Text>
            </Flex>
            <Flex p="15px">
              <Image w="30px" h="30px" src="/static/images/hokey.png" borderRadius="10px" alt="hokey-icon" />
              <Text size="xl" pl="10px" textAlign="center" color="gray.600">
                Hokey
              </Text>
            </Flex>
            <Flex p="15px">
              <Image w="30px" h="30px" src="/static/images/football.png" borderRadius="10px" alt="football-icon" />
              <Text size="xl" pl="10px" textAlign="center" _hover={{ color: "white" }} color="gray.600">
                Football
              </Text>
            </Flex>
          </Flex>
          <Flex
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
            p="15px"
            borderRadius="10px"
            w="350px"
            h="200px"
            _hover={{ backgroundColor: "blue", color: "white" }}
          >
            <Flex flexDir="column">
              <Flex>
                <Avatar name="Jan Novak" src="/static/images/novak.jpg" />
                <Flex flexDir="column" pl="5">
                  <Text size="xl" pl="10px" textAlign="center" as="b" fontSize="20px">
                    Nas kontakt
                  </Text>
                  <Text size="xl" pl="10px">
                    Jan Novak
                  </Text>
                </Flex>
              </Flex>
              <Flex p="15px">
                <PhoneIcon mr="20px" />
                <Text size="xl" pl="10px" color="gray.500">
                  +420123412435
                </Text>
              </Flex>
              <Flex p="15px">
                <EmailIcon mr="20px" />
                <Text size="xl" pl="10px" color="gray.500">
                  jan.novak@seznam.cz
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* <Box p="2rem">
        <Container maxW="6xl" display="flex" alignItems="center" justifyContent="space-between">
          <Tabs>
            <TabList>
              <Tab>Základní informace</Tab>
              <Tab>Soupiska týmu</Tab>
              <Tab>Sezóny</Tab>
              <Tab>statistiky týmu</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TeamInfo />
              </TabPanel>
              <TabPanel>
                <TeamTable />
              </TabPanel>
              <TabPanel>
                k
                <SeasonTable />
              </TabPanel>
              <TabPanel>jh</TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box> */}
    </Page>
  );
};

export default TeamDetailPage;
