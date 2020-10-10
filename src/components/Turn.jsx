import React from 'react';

import YourTurn from './YourTurn';

export default function Turn(props) {
  let users = [...props.game["users"]]
  users.sort(function(a, b) {
    return a["id"] - b["id"]
  });
  console.log("users", users)
  console.log("turn", props.game["game"]["turn"])
  let current_turn_user_name = users[props.game["game"]["turn"]]["user_name"]

  if (current_turn_user_name === props.userName) {
    return <YourTurn game={props.game} setGame={props.setGame} userTeam={props.userTeam}/>
  } else {
    return `It's ${current_turn_user_name}'s turn`
  }
}
