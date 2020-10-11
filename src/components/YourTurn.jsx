import React, { useEffect, useState } from 'react';

import PromptDisplayer from './PromptDisplayer';

const turnTime = 60

export default function YourTurn(props) {
  const [timeRemaining, setTimeRemaining] = useState(undefined)
  const [turnUpdate, setTurnUpdate] = useState({
    "red_score": props.game["game"]["red_score"],
    "blue_score": props.game["game"]["blue_score"],
    "prompts_to_delete": [],
    "turn": (props.game["game"]["turn"] + 1) % props.game["users"].length,
    "game_name": props.game["game"]["game_name"]
  })

  const endTurn = (game_over=false) => {
    if (!game_over) {
      console.log("ending turn", turnUpdate)
      fetch(`https://charade-cascade.herokuapp.com/end-turn?game_name=${turnUpdate["game_name"]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(turnUpdate)
      })
      .then(response => response.json())
      .then(game => {
        console.log(game)
        props.setGame(game)
      });
    } else {
      console.log("ending game")
      let final_score = {
        "red_score": turnUpdate["red_score"],
        "blue_score": turnUpdate["blue_score"],
      }
      final_score[`${props.userTeam}_score`] = final_score[`${props.userTeam}_score`] + 1
      fetch(`https://charade-cascade.herokuapp.com/end-game?game_name=${turnUpdate["game_name"]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(final_score)
      })
      .then(response => response.json())
      .then(game => {
        console.log(game)
        props.setGame(game)
      });
    }
  }

  useEffect(() => {
    timeRemaining > 0 && setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    if (timeRemaining === 0) {
      endTurn()
    } else if (timeRemaining === turnTime) {
      setTurnUpdate({
        "red_score": props.game["game"]["red_score"],
        "blue_score": props.game["game"]["blue_score"],
        "prompts_to_delete": [],
        "turn": (props.game["game"]["turn"] + 1) % props.game["users"].length,
        "game_name": props.game["game"]["game_name"]
      })
    }
  }, [timeRemaining])

  if (timeRemaining === undefined) {
   return <button onClick={() => setTimeRemaining(turnTime)}>Start</button>
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
