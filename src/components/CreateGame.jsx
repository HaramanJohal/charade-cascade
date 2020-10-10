import React, { useState } from 'react';

import Prompts from './Prompts';

export default function CreateGame(props) {
  const [userName, setUserName] = useState("")
  const [gameName, setGameName] = useState("")
  const [prompts, setPrompts] = useState(["", "", "", "", ""])

  const handleCreateGame = (e) => {
    e.preventDefault()
    fetch(`/create-game?game_name=${gameName}&user_name=${userName}&prompts=${prompts.join("£")}`)
    .then(response => response.json())
    .then(game => {
      console.log(game)
      props.setUserName(userName)
      props.setUserTeam(game["users"].find((user) => user["user_name"] === userName)["team"])
      props.setGame(game)
    });
  }

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  }

  const handleChangeGameName = (e) => {
    setGameName(e.target.value);
  }

  const handleUpdatePrompts = (prompt_index, e) => {
    let newPrompts = [...prompts]
    newPrompts[prompt_index] = e.target.value
    setPrompts(newPrompts)
  }

  var promptInputs = prompts.map((prompt, i) => {
    return (
      <>
        <br/>
        <input type="text" value={prompt} onChange={(newPrompt) => handleUpdatePrompts(i, newPrompt)} />
      </>
    )
  })

  return (
    <form onSubmit={handleCreateGame}>
      <label>User name:
        <input type="text" value={userName} onChange={handleChangeUserName} />
      </label>
      <br/>
      <label>Game name:
        <input type="text" value={gameName} onChange={handleChangeGameName} />
      </label>
      <br/>
      <Prompts prompts={prompts} setPrompts={setPrompts} />
      <br/>
      <input type="submit" value="Submit" />
    </form>
  )
}