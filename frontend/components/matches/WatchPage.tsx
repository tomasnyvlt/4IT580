import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { AiFillCaretRight, AiOutlinePauseCircle } from "react-icons/ai";

import "react-circular-progressbar/dist/styles.css";

const gameDuration = 25;

// mutation addFault{
//   addEvent(eventTypeKey:"didFaul", matchId: 1, userId: 13, time:"10:35",recieverUserId:12){
//     id_event
//     timeHappened
//     eventType{
//       name
//     }
//     user{
//       CHYBI ID
//       firstName
//       lastName
//     }
//   }
// }

const teams = [
  {
    team_id: 1,
    name: "Alpha",
    users: [
      {
        id_user: 1,
        firstName: "nastya",
        lastName: "test"
      },
      {
        id_user: 2,
        firstName: "tomas",
        lastName: "tomas"
      }
    ]
  },
  {
    team_id: 2,
    name: "Betha",
    users: [
      {
        id_user: 3,
        firstName: "stepan",
        lastName: "test"
      },
      {
        id_user: 4,
        firstName: "michal",
        lastName: "test"
      }
    ]
  }
];

const WatchPage: FC = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [minutes, setMinutes] = useState(gameDuration);
  const [seconds, setSeconds] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const [playersWithGoal, setPlayersWithGoal] = useState([""]);
  const [playersWithFault, setPlayersWithFault] = useState([""]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            setSeconds(seconds);
            setMinutes(minutes);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [seconds, isPaused]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const percentage = 100;

  // TODO: FIX ANY
  const addAction = (event: any) => {
    const { value } = event.target;
    setActionType(value);
    setIsModalOpen(!isModalOpen);
    setIsPaused(true);
  };

  // TODO: FIX ANY
  const addGol = (event: any) => {
    const { id } = event.target;
    setPlayersWithGoal((current) => [...current, id]);
    console.log(id);
    setIsModalOpen(false);
    setIsPaused(false);
  };

  // TODO: FIX ANY
  const addFault = (event: any) => {
    const { id } = event.target;
    setPlayersWithFault((current) => [...current, id]);
    console.log(id);
    setIsModalOpen(false);
    setIsPaused(false);
  };

  console.log("playersWithGoal", playersWithGoal);
  console.log("playersWithFault", playersWithFault);

  return (
    <Box>
      <Container>
        <Flex justifyContent="center" alignItems="center" flexDir="row">
          <Flex flexDir="column">
            <Heading>{teams[0].name}</Heading>
            <Flex flexDir="row" justifyContent="space-between">
              <Button value="goal" onClick={addAction}>
                Goal
              </Button>
              <Button value="fault" onClick={addAction}>
                Fault
              </Button>
            </Flex>

            {isModalOpen ? (
              <Box>
                {teams[0].users.map((user) => {
                  return actionType === "goal" ? (
                    <Button id={user.id_user.toString()} key={user.id_user} onClick={addGol}>
                      Pridat gol pro {user.firstName}
                    </Button>
                  ) : (
                    <Button id={user.id_user.toString()} key={user.id_user} onClick={addFault}>
                      Pridat fault pro {user.firstName}
                    </Button>
                  );
                })}
              </Box>
            ) : (
              []
            )}
          </Flex>
          <Container maxW="xs" mb="3rem">
            <CircularProgressbar
              value={percentage}
              text={`${timerMinutes} : ${timerSeconds}`}
              styles={buildStyles({ textColor: "black" })}
            />
            {isPaused ? (
              <Button onClick={() => setIsPaused(false)}>
                <AiFillCaretRight />
                Start
              </Button>
            ) : (
              <Button onClick={() => setIsPaused(true)}>
                <AiOutlinePauseCircle />
                Pause
              </Button>
            )}
          </Container>
          <Flex flexDir="column">
            <Heading>{teams[1].name}</Heading>
            <Flex flexDir="row" justifyContent="space-between">
              <Button value="goal" onClick={addAction}>
                Goal
              </Button>
              <Button value="fault" onClick={addAction}>
                Fault
              </Button>
            </Flex>

            {isModalOpen ? (
              <Box>
                {teams[1].users.map((user) => {
                  return actionType === "goal" ? (
                    <Button id={user.id_user.toString()} key={user.id_user} onClick={addGol}>
                      Pridat gol pro {user.firstName}
                    </Button>
                  ) : (
                    <Button id={user.id_user.toString()} key={user.id_user} onClick={addFault}>
                      Pridat fault pro {user.firstName}
                    </Button>
                  );
                })}
              </Box>
            ) : (
              []
            )}
          </Flex>
        </Flex>

        {/* <Flex flexDir="row" justifyContent="space-between">
          {teams.map((team, index) => (
            <Box key={team.team_id}>
              {team.name}
              <Button value="goal" onClick={addAction}>
                Goal
              </Button>
              <Button value="fault" onClick={addAction}>
                Fault
              </Button>
              {isModalOpen ? (
                <Box>
                  {team.users.map((user) => {
                    return actionType === "goal" ? (
                      <Button id={user.id_user.toString()} key={user.id_user} onClick={addGol}>
                        Pridat gol pro {user.firstName}
                      </Button>
                    ) : (
                      <Button id={user.id_user.toString()} key={user.id_user} onClick={addFault}>
                        Pridat fault pro {user.firstName}
                      </Button>
                    );
                  })}
                </Box>
              ) : (
                []
              )}
            </Box>
          ))}
        </Flex> */}
      </Container>
    </Box>
  );
};

export default WatchPage;
