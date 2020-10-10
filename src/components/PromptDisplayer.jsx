import React, { useEffect, useState } from 'react';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function PromptDisplayer(props) {
  const unusedPromptsThisRound = props.game["prompts"].filter(prompt => prompt[`used_in_${props.game["game"]["round"]}_round`] === 0)
  shuffleArray(unusedPromptsThisRound)

  console.log(unusedPromptsThisRound)


  const [canSkip, setCanSkip] = useState(true)
  const [round, setRound] = useState(props.game["game"]["round"])
  const [skippedPrompt, setSkippedPrompt] = useState(undefined)
  const [currentPrompt, setCurrentPrompt] = useState(unusedPromptsThisRound.pop())
  const [availablePrompts, setAvailablePrompts] = useState(unusedPromptsThisRound)

  const popNextPrompt = () => {
    let newAvailablePrompts = [...availablePrompts]
    console.log("newAvailablePrompts", newAvailablePrompts)
    if (newAvailablePrompts.length === 0) {
      if (skippedPrompt !== undefined) {
        setCurrentPrompt(skippedPrompt)
        setSkippedPrompt(undefined)
        setCanSkip(false)
      } else {
        console.log("all prompts solved")
        if (round === "speech") {
          setRound("word")
        } else if (round === "word") {
          setRound("charade")
        } else {
          let newTurnUpdate = JSON.parse(JSON.stringify(props.turnUpdate))
          newTurnUpdate["round"] = "game_over"
          newTurnUpdate[`${props.userTeam}_score`] += 1
          // props.setTurnUpdate(newTurnUpdate)
          props.endTurn(newTurnUpdate)
        }
      }
    } else {
      setCurrentPrompt(newAvailablePrompts.pop())
      setAvailablePrompts(newAvailablePrompts)
    }
  }

  const handleGotIt = () => {
    let newTurnUpdate = JSON.parse(JSON.stringify(props.turnUpdate))
    let i = newTurnUpdate["prompts"].findIndex((prompt) => prompt["prompt"] === currentPrompt["prompt"])
    console.log("i", i)
    console.log("prompts", newTurnUpdate["prompts"])
    newTurnUpdate["prompts"][i][`used_in_${round}_round`] = 1
    newTurnUpdate[`${props.userTeam}_score`] += 1
    props.setTurnUpdate(newTurnUpdate)

    popNextPrompt()
  }

  const handleSkip = () => {
    if (skippedPrompt === undefined) {
      setSkippedPrompt(currentPrompt)
      popNextPrompt()
    } else {
      // let tempPrompt = JSON.parse(JSON.stringify(skippedPrompt["prompt"]))
      setSkippedPrompt(currentPrompt)
      setCurrentPrompt(skippedPrompt)
    }
  }

  useEffect(() => {
    console.log("round ended")
    let allPrompts = JSON.parse(JSON.stringify(props.game["prompts"]))
    shuffleArray(allPrompts)
    let newCurrentPrompt = allPrompts.pop()
    setCurrentPrompt(newCurrentPrompt)
    setAvailablePrompts(allPrompts)
    console.log("set new current prompt to", newCurrentPrompt)
    console.log("set new available prompts to", allPrompts)
    let newTurnUpdate = JSON.parse(JSON.stringify(props.turnUpdate))
    newTurnUpdate["round"] = round
    props.setTurnUpdate(newTurnUpdate)
  }, [round])

  console.log("round is", round)
  return (
    <>
      { (currentPrompt !== undefined) ?
        <>
          <p>{currentPrompt["prompt"]}</p>
          <button onClick={handleGotIt}>Got it!</button>
          {canSkip ? <button onClick={handleSkip}>Skip</button> : <p>This is the last prompt for the round</p>}
        </>
        :
        <p>Loading</p>
      }
    </>
  )
}
