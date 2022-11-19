import { Box, Button, Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { AiFillCaretRight, AiOutlinePauseCircle } from "react-icons/ai";

import "react-circular-progressbar/dist/styles.css";

const gameDuration = 25;

const WatchPage: FC = () => {
  const [isPaused, setIsPaused] = useState(true);
  const [minutes, setMinutes] = useState(gameDuration);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isPaused) {
      let interval = setInterval(() => {
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

  return (
    <Box maxWidth="150px">
      <Flex justifyContent="center">
        <CircularProgressbar
          value={percentage}
          text={`${timerMinutes} : ${timerSeconds}`}
          styles={buildStyles({ textColor: "black" })}
        />
      </Flex>

      {isPaused ? (
        <Button onClick={() => setIsPaused(false)}>
          <AiFillCaretRight />
          Play
        </Button>
      ) : (
        <Button onClick={() => setIsPaused(true)}>
          <AiOutlinePauseCircle />
          Pause
        </Button>
      )}
    </Box>
  );
};

export default WatchPage;

// reset button,animated interval
