import React, { useEffect, useState } from 'react';

export default function PromptDisplayer(props) {
  
  const [remainingPrompts, setRemainingPrompts] = useState(props.game["prompts"])
  const [currentPrompt, setCurrentPrompt] = useState(undefined)
  
  useEffect(() => {
    let firstPrompt = getNextPrompt(remainingPrompts)
    setCurrentPrompt(firstPrompt)
    let i = remainingPrompts.indexOf(firstPrompt)
    let newRemainingPrompts = JSON.parse(JSON.stringify(remainingPrompts))
    newRemainingPrompts.splice(i, 1)
    setRemainingPrompts(newRemainingPrompts)
  }, [])

  const getNextPrompt = (currentRemainingPrompts) => {
    let speech_remaining = currentRemainingPrompts.filter(prompt => prompt["game_round"] === "speech")
    let word_remaining = currentRemainingPrompts.filter(prompt => prompt["game_round"] === "word")
    let charade_remaining = currentRemainingPrompts.filter(prompt => prompt["game_round"] === "charade")
  
    let nextPrompt
    if (speech_remaining.length !== 0) {
      nextPrompt = speech_remaining[Math.floor(Math.random() * speech_remaining.length)]
    } else if (word_remaining.length !== 0) {
      nextPrompt = word_remaining[Math.floor(Math.random() * word_remaining.length)]
    } else if (charade_remaining.length !== 0) {
      nextPrompt = charade_remaining[Math.floor(Math.random() * charade_remaining.length)]
    } else {
      return null
    }
    return nextPrompt
  }
  
  const handleGotIt = () => {
    let newTurnUpdate = JSON.parse(JSON.stringify(props.turnUpdate))
    newTurnUpdate["prompts_to_delete"].push(currentPrompt)
    newTurnUpdate[`${props.userTeam}_score`] += 1
    props.setTurnUpdate(newTurnUpdate)
    
    let nextPrompt = getNextPrompt(remainingPrompts)
    
    if (nextPrompt === null) {
      console.log("GAME OVER")
      props.endTurn(true)
    }
    
    let i = remainingPrompts.indexOf(nextPrompt);
    let newRemainingPrompts = JSON.parse(JSON.stringify(remainingPrompts))
    newRemainingPrompts.splice(i, 1)
    setRemainingPrompts(newRemainingPrompts)
    setCurrentPrompt(nextPrompt)
  }

  console.log("remaining:", remainingPrompts)

  return (
    <>
      { (currentPrompt !== undefined && currentPrompt !== null) ?
        <>
          {
            currentPrompt["game_round"] === "speech" ?
            <p>Use words to describe the prompt</p>
            : null
          }
          {
            currentPrompt["game_round"] === "word" ?
            <p>Use a single word to describe the prompt</p>
            : null
          }
          {
            currentPrompt["game_round"] === "charade" ?
            <p>Act our the prompt in silence</p>
            : null
          }
          <p>{currentPrompt["prompt"]}</p>
          <button onClick={handleGotIt}>Got it!</button>
        </>
        :
        <p>Loading</p>
      }
    </>
  )
}
