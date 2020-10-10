import React, { useEffect, useState } from 'react';

import PromptDisplayer from './PromptDisplayer';

export default function YourTurn(props) {
  const [timeRemaining, setTimeRemaining] = useState(undefined)
  const [turnUpdate, setTurnUpdate] = useState({
    "red_score": props.game["game"]["red_score"],
    "blue_score": props.game["game"]["blue_score"],
    "prompts": props.game["prompts"],
    "round": props.game["game"]["round"],
    "turn": (props.game["game"]["turn"] + 1) % props.game["users"].length,
    "game_name": props.game["game"]["game_name"]
  })

  const endTurn = (finalTurnUpdate) => {
    fetch(`/end-turn?game_name=${finalTurnUpdate["game_name"]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalTurnUpdate)
    })
    .then(response => response.json())
    .then(game => {
      console.log(game)
      props.setGame(game)
    });
  }

  useEffect(() => {
    timeRemaining > 0 && setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    if (timeRemaining === 0) {
      endTurn(turnUpdate)
    }
  }, [timeRemaining])

  if (timeRemaining === undefined) {
   return <button onClick={() => setTimeRemaining(5)}>Start</button>
  } else if (timeRemaining === 0) {
    return <p>Time's up!</p>
  } else {
    return (
      <>
        <p>Time remaining: {timeRemaining}</p>
        <PromptDisplayer
          game={props.game}
          turnUpdate={turnUpdate}
          setTurnUpdate={setTurnUpdate}
          endTurn={endTurn}
          userTeam={props.userTeam}
        />
      </>
    )
  }
}
