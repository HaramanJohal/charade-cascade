import React, { useState } from 'react';

export default function RejoinGame(props) {
  const [gameName, setGameName] = useState("")
  const [userName, setUserName] = useState("")

  const handleJoinGame = (e) => {
    e.preventDefault()
    fetch(`/rejoin-game?game_name=${gameName}&user_name=${userName}`)
    .then(response => response.json())
    .then(game => {
      console.log(game)
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
      <input type="submit" value="Submit" />
    </form>
  )
}