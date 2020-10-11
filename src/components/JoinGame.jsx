import React, { useState } from 'react';

import Prompts from './Prompts';

export default function JoinGame(props) {
  const [prompts, setPrompts] = useState(["", "", "", "", ""])
  const [gameName, setGameName] = useState("")
  const [userName, setUserName] = useState("")

  const handleJoinGame = (e) => {
    e.preventDefault()
    fetch(`https://charade-cascade.herokuapp.com/join-game?game_name=${gameName}&user_name=${userName}&prompts=${prompts.join("£")}`)
    .then(response => response.json())
    .then(game => {
      console.log("joined game", game)
      props.setUserName(userName)
      props.setUserTeam(game["users"].find((user) => user["user_name"] === userName)["team"])
      props.setGame(game)
    });
  }

  const handleChangeGameName = (e) => {
    setGameName(e.target.value);
  }

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  }

  return(
    <form onSubmit={handleJoinGame}>
      <label>Game name:
        <input type="text" value={gameName} onChange={handleChangeGameName} />
      </label>
      <br/>
      <label>User name:
        <input type="text" value={userName} onChange={handleChangeUserName} />
      </label>
      <br/>
      <Prompts prompts={prompts} setPrompts={setPrompts} />
      <input type="submit" value="Submit" />
    </form>
  )
}