import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { NextPage } from "next";

import Landing from "../../components/layouts/Landing";
import Page from "../../components/layouts/Page";
import SeasonTable from "../../components/teams/SeasonTable";
import TeamInfo from "../../components/teams/TeamInfo";
import TeamTable from "../../components/teams/TeamTable";

const TeamDetailPage: NextPage = () => {
  return (
    <Page>
      <Landing>
        <Box p="2rem">
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
                  <p>Sezóny</p>
                  <p>
                    (Tabulka obsahující přehled soutěží, kterých se tým historicky účastnil či nyní účastní - sort DESC)
                    - ikonka sportu - název soutěže - umístění (aktuální)
                  </p>
                  <SeasonTable />
                </TabPanel>
                <TabPanel>
                  <p>statistiky týmu</p>
                  <p>
                    - combo box na výběr sezóny: (výběr ročníku) (tabulka hráčů -datatable se sortingem podle
                    jakehokoliv kriteria statistiky): - Pořadí (1.,2., ... ) (pagination po 30) - Jméno a Příjmení -
                    Počet zápasů - Góly - Asistence - KB (Kanadské body = součet gólů a asistencí - přidat tooltip) -
                    Pr.KB (Průměr Kanadského bodu na zápas - přidat tooltip) - Trestné minuty (tabulka brankáři -
                    datatable se sortingem podle jakehokoliv kriteria statistiky) - Pořadí (1.,2., ... ) (pagination po
                    30) - Jméno a Příjmení - Počet zápasů - Minut (Počet odehraných minut) - Góly (Poče obdržených gólů
                    - přidat tooltip) - Nuly (Počet vychytaných nul na zápas - přidat tooltip)
                  </p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        </Box>
      </Landing>
    </Page>
  );
};

export default TeamDetailPage;
