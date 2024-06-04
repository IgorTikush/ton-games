import { useEffect, useState } from "react";
import { socket } from "../App";
import { Button } from "./styled/styled";
import styled from "styled-components";

const choices = [
  { id: 'rock', name: 'Rock', image: 'https://pictures-misal.s3.amazonaws.com/Screenshot+2024-06-03+at+04.48.30.png' },
  { id: 'paper', name: 'Paper', image: 'https://pictures-misal.s3.amazonaws.com/Screenshot+2024-06-03+at+04.48.40.png'},
  { id: 'scissors', name: 'Scissors', image: 'https://pictures-misal.s3.amazonaws.com/Screenshot+2024-06-03+at+04.48.48.png' },
];

const GameContainer = styled.div`
  text-align: center;
`;

const ChoicesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px;
  position: relative;
  height: 300px;
`;

const ChoiceButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;

  img {
    width: 100px;
    height: 100px;
  }

  &:hover {
    transform: scale(1.1);
  }

  &.rock {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
  }

  &.paper {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  &.scissors {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

export const RockPaperScissorsGame = (props: {roomName: string}) => {
  const [result, setResult] = useState('');
  const [playerChoice, setPlayerChoice] = useState(null);

  useEffect(() => {
    socket.on('gameResult', (result: any) => {
      if (result.status === 'draw') {
        setResult('It\'s a draw!');
        return;
      }

      const gameResult = result.winner === socket.id ? 'You win!' : 'You lose!';
      setResult(gameResult);
    })
  }, [])
  const makeMove = (move: string) => {
    socket.emit('makeMove', { roomName: props.roomName, move })
  }

  const handleClick = (choice: any) => {
    setPlayerChoice(choice);
    makeMove(choice);
    // Here you can add logic for the computer's choice and determine the winner
  };

  if (result) {
    return (
      <div>
        <h1>{result}</h1>
        <Button onClick={() => window.location.reload()}>Back to main menu</Button>
      </div>
    )
  }

  return (
    <GameContainer>
      <h1>Rock Paper Scissors</h1>
      <ChoicesContainer>
        {choices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            className={choice.id}
            onClick={() => handleClick(choice.id)}
            disabled={!!playerChoice}
          >
            <img src={choice.image} alt={choice.name} />
            {/* <span>{choice.name}</span> */}
          </ChoiceButton>
        ))}
      </ChoicesContainer>
      {playerChoice && <p>You chose: {playerChoice}</p>}
    </GameContainer>
  );
}