import React, { useState } from 'react';

import SetupGame from './SetupGame';
import Refresh from './Refresh';
import Turn from './Turn';

export default function Game(props) {
  const [game, setGame] = useState(undefined)
  const [userName, setUserName] = useState(undefined)
  const [userTeam, setUserTeam] = useState(undefined)

  if (game === undefined) {
    return <SetupGame setGame={setGame} setUserName={setUserName} setUserTeam={setUserTeam}/>
  } else {
    return(
      <>
        <Refresh gameName={game["game"]["game_name"]} setGame={setGame}/>
        <p>Welcome to Charade Cascade {userName}!</p>
        <p>Game name: {game["game"]["game_name"]}</p>
        <p>You are on the {userTeam} team</p>
        <p>Red Team ({game["game"]["red_score"]}):</p>
        {game["users"].filter((user) => user["team"] === "red").map((user) => <p>{user["user_name"]}</p>)}
        <p>Blue Team ({game["game"]["blue_score"]}):</p>
        {game["users"].filter((user) => user["team"] === "blue").map((user) => <p>{user["user_name"]}</p>)}
        <p>Players have written {game["prompts"].length} prompts</p>
        { 
          game["game"]["round"] === "speech" ?
          <p>This round is speech. Use as many words as you like to describe the prompt!</p> : null
        }
        { 
          game["game"]["round"] === "word" ?
          <p>This round is single words. Use a single word to describe the prompt!</p> : null
        }
        { 
          game["game"]["round"] === "charade" ?
          <p>This round is charades. Act out the prompt in silence!</p> : null
        }
        {
          (game["game"]["round"] !== "game_over") ?
          <Turn game={game} userName={userName} userTeam={userTeam} setGame={setGame}/>
          : <p>Game Over!</p>
        }
      </>
    )
  }
}