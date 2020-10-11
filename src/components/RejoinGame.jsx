import React, { useState } from 'react';

export default function RejoinGame(props) {
  const [gameName, setGameName] = useState("")
  const [userName, setUserName] = useState("")

  const handleRejoinGame = (e) => {
    e.preventDefault()
    fetch(`https://charade-cascade.herokuapp.com/rejoin-game?game_name=${gameName}&user_name=${userName}`)
    .then(response => response.json())
    .then(game => {
      console.log("rejoined game", game)
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
    <form onSubmit={handleRejoinGame}>
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