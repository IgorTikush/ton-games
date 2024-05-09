import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "../hooks/useCounterContract";
import { useTonConnect } from "../hooks/useTonConnect";
import { makeRequest } from '../utils/makeRequest';

import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Ellipsis,
  Button,
} from "./styled/styled";
import { socket } from "../App";
import { useEffect, useState } from "react";
import { RockPaperScissorsGame } from "./Rock-paper-scissors-game";
import { Address } from "ton-core";
import { API_URL } from "../config";

export const MainMenu = () => {
  const { connected, sender, wallet } = useTonConnect();
  const [screen, setScreen] = useState('main');
  const [room, setRoom] = useState('');
  // const { value, address, sendIncrement } = useCounterContract();

  useEffect(() => {
    socket.on('gameReady', ({ room }) => {
      setScreen('game');
      setRoom(room);
      console.log(room);
      // console.log('SecondPlayer connected');
      // setRoomName(room);
      // setScreen('game');
    });
  }, [])

  if (screen === 'game') {
    return <RockPaperScissorsGame
      // socket={socket}
      roomName={room}
    />
  }

  const sendTransaction = async (amount: bigint) => {
    console.log('123')
    // const res =  await sender.send({ to: '0QDGUvYWclDqT0QySRSXgbUOjmgS-R_Sd851OWgoio_CUme2',  value: amount }).catch((err: Error) => {
    //   console.log(err);
    //   return null;
    // });

    // if (res) {
    const res = await makeRequest({url: `${API_URL}/buy-completed`, method: 'POST', wallet, body: {txId: 'txId' }});
    console.log(res);
    // }
  }

  return (
    <div className="Container">
      <Card onClick={() => {sendTransaction(100000000n)}}>
        Buy Tokens
      </Card>
      {/* <TonConnectButton /> */}

      <Card
      //  onClick={() => console.log(11)}
      //  disabled={!connected}
       >
        {/* <FlexBoxCol> */}
          <h3>Rock Paper Scissors</h3>
          {/* <h3>Enter Queue</h3> */}
          {/* <FlexBoxRow>
            <b>Address</b>
            <Ellipsis></Ellipsis>
          </FlexBoxRow> */}
          {/* <FlexBoxRow>
            <b>Value</b>
            <div>{value ?? "Loading..."}</div>
          </FlexBoxRow> */}
          <Button
            // disabled={!connected}
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={() => {
              console.log(socket)
              socket.emit('checkRooms');
            }}
          >
            Enter Queue
          </Button>
        {/* </FlexBoxCol> */}
      </Card>
    </div>
  );
}
