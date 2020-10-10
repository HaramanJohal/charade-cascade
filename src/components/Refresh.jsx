import React from 'react';

export default function Refresh(props) {
  const handleRefresh = () => {
    fetch(`/refresh-game?game_name=${props.gameName}`)
    .then(response => response.json())
    .then(game => {
      console.log("refreshed game:", game)
      props.setGame(game)
    });
  }

  return (
    <button onClick={handleRefresh}>Refresh</button>
  )
}