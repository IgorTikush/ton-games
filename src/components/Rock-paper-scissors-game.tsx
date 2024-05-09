import { useState } from "react";
import { socket } from "../App";

export const RockPaperScissorsGame = (props: {roomName: string}) => {
  const [result, setResult] = useState('');
  const makeMove = (move: string) => {
    socket.emit('makeMove', { roomName: props.roomName, move })
    console.log('I make move', move)
  }

  return (
    <div>
      <h1 onClick={() => makeMove('rock')}>Rock</h1>
      <h1 onClick={() => makeMove('paper')}>Paper</h1>
      <h1 onClick={() => makeMove('scissors')}>Scissors</h1>
    </div>
  );
}