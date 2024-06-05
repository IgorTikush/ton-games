import { TonConnectButton } from "@tonconnect/ui-react";
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
import { PurchaseModal } from "./purchase.modal";
import { CircularProgress } from "@mui/material";

export const MainMenu = () => {
  const { connected, sender, wallet } = useTonConnect();
  const [screen, setScreen] = useState('main');
  const [room, setRoom] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    socket.on('gameReady', ({ room }: any) => {
      setRoom(room);
      setScreen('game');
      // setRoom(room);
      // console.log(room);
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

  const getSearchButton = () => {
    if (isSearching) {
      return (<CircularProgress />)
    }

    return (
      <Button
        disabled={!connected}
        className={`Button ${connected ? "Active" : "Disabled"}`}
        onClick={() => {
          console.log(socket);
          setIsSearching(true);
          socket.emit('checkRooms');
        }}
      >
        Enter Queue
      </Button>
    );
  }

  return (
    <div className="Container">
      
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
          {getSearchButton()}
        {/* </FlexBoxCol> */}
      </Card>
    </div>
  );
}
