import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";

const TeamInfo: FC = () => {
  return (
    <>
      <Flex direction="column">
        <Box display="flex" flexDirection="row" mb="5">
          <Image src="/static/images/8_big16.png" alt="" height="20" width="20" />

          <Heading as="h2" size="3xl">
            Jsme Nazev tymu
          </Heading>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="30%">
            <Box display="flex" alignItems="baseline" p="6">
              <Box fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
                My hrajeme
              </Box>
            </Box>
            <Box p="6">
              {" "}
              <Image src="/static/images/125248.png" alt="" height="20" width="20" />
              <Box fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" m="2">
                Hokej
              </Box>
            </Box>
          </Box>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="30%">
            <Box display="flex" alignItems="baseline" p="6">
              <Box fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
                Typ týmu
              </Box>
            </Box>
            <Box p="6">
              {" "}
              <Box fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" m="2">
                Amatoři
              </Box>
            </Box>
          </Box>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="30%">
            <Box display="flex" alignItems="baseline" p="6">
              <Box fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
                Kontaktní osoba
              </Box>
            </Box>
            <Box p="6" display="flex" flexDirection="row">
              <Image src="/static/images/person-4.png" alt="" height="20" width="20" />

              <Box
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                m="2"
                alignSelf="center"
              >
                <Link href="/app/player/id">
                  <Text>Jan Cerny</Text>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>

      {/* <Text></Text>
      <Image src="/static/images/hokey-icon.png" alt="" width="180" height="200" borderRadius="md" />
      <Link href="/app/player/id">
        <Text>Kontaktní osoba</Text>
      </Link> */}

      {/* <p>Základní informace</p>
      <p>
        - logo týmu - Název týmu - Sport (ikona + název sportu) - Typ týmu - Kontaktní osoba týmu (link na profil hráče)
      </p> */}
    </>
  );
};

export default TeamInfo;
