import React, { useState } from 'react';

import CreateGame from './CreateGame';
import JoinGame from './JoinGame';
import RejoinGame from './RejoinGame';

export default function SetupGame(props) {
  const [mode, setMode] = useState("none")

  if (mode === "none") {
    return(
      <>
        <button onClick={() => setMode("create")}>Create Game</button>
        <p> or </p>
        <button onClick={() => setMode("join")}>Join Game</button>
        <p> or </p>
        <button onClick={() => setMode("rejoin")}>Rejoin Game</button>
      </>
    )
  } else if (mode === "create") {
    return <CreateGame setGame={props.setGame} setUserName={props.setUserName} setUserTeam={props.setUserTeam}/>
  } else if (mode === "join") {
    return <JoinGame setGame={props.setGame} setUserName={props.setUserName} setUserTeam={props.setUserTeam}/>
  } else if (mode === "rejoin") {
    return <RejoinGame setGame={props.setGame} setUserName={props.setUserName} setUserTeam={props.setUserTeam}/>
  }
}