import React from 'react';

export default function Prompts(props) {
  const handleUpdatePrompts = (prompt_index, e) => {
    let newPrompts = [...props.prompts]
    newPrompts[prompt_index] = e.target.value
    props.setPrompts(newPrompts)
  }

  var promptInputs = props.prompts.map((prompt, i) => {
    return (
      <>
        <br/>
        <input type="text" value={prompt} onChange={(newPrompt) => handleUpdatePrompts(i, newPrompt)} />
      </>
    )
  })

  return (
    <>
      <label>Please provide some prompts:
          {promptInputs}
      </label>
      <br/>
    </>
  )
}