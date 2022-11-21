import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

import Basic from "components/cards/Basic";
import { Match } from "types/generated-types";

interface MatchDoneProps {
  match?: Match;
}

const MatchDone: FC<MatchDoneProps> = ({ match }) => {
  return (
    <Flex flexDirection="column" gap="1rem">
      <Basic heading="Základní informace" withBackground>
        <Flex flexDirection="column" gap="0.5rem">
          <Text>
            Domácí: <strong>{match?.teams?.[0]?.name}</strong>
          </Text>
          <Text>
            Hosté: <strong>{match?.teams?.[1]?.name}</strong>
          </Text>
          <Text>
            Skóre:{" "}
            <strong>
              {match?.score?.[0]?.points} : {match?.score?.[1]?.points}
            </strong>
          </Text>
        </Flex>
      </Basic>

      <Basic heading="Seznam událostí" withBackground>
        <Text>Seznam událostí / Žádné událososti</Text>
      </Basic>
    </Flex>
  );
};

export default MatchDone;
