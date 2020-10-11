import React, { useEffect, useState } from 'react';

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//   }
// }

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
      nextPrompt = speech_remaining[0]
    } else if (word_remaining.length !== 0) {
      nextPrompt = word_remaining[0]
    } else if (charade_remaining.length !== 0) {
      nextPrompt = charade_remaining[0]
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
          <p>{currentPrompt["prompt"]}</p>
          <button onClick={handleGotIt}>Got it!</button>
        </>
        :
        <p>Loading</p>
      }
    </>
  )
}
