import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";

const TeamInfo: FC = () => {
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Image src="/static/images/8_big16.png" alt="" width="180" height="200" />

        <Text>Nazev tymu</Text>
      </Box>

      <p>Základní informace</p>
      <p>
        - logo týmu - Název týmu - Sport (ikona + název sportu) - Typ týmu - Kontaktní osoba týmu (link na profil hráče)
      </p>
    </>
  );
};

export default TeamInfo;
