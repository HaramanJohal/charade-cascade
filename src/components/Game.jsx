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
        <p>Welcome to Charade Cascade {userName}!</p>
        <p>Game name: {game["game"]["game_name"]}</p>
        <p>You are on the {userTeam} team</p>
        <p>Red Team ({game["game"]["red_score"]}):</p>
        {game["users"].filter((user) => user["team"] === "red").map((user) => <p>{user["user_name"]}</p>)}
        <p>Blue Team ({game["game"]["blue_score"]}):</p>
        {game["users"].filter((user) => user["team"] === "blue").map((user) => <p>{user["user_name"]}</p>)}
        <p>There are {game["prompts"].length} prompts left</p>
        <Refresh gameName={game["game"]["game_name"]} setGame={setGame}/>
        {
          (!game["game"]["game_over"]) ?
          <>
            <Turn game={game} userName={userName} userTeam={userTeam} setGame={setGame} />
          </>
          : 
          <>
            <p>Game Over!</p>
            <p>Final scores</p>
            <p>Red {game["game"]["red_score"]} - {game["game"]["blue_score"]} Blue</p>
          </>
        }
      </>
    )
  }
}