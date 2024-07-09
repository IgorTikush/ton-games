import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import io from 'socket.io-client';

import { useTonConnect } from "../hooks/useTonConnect";
import { makeRequest } from '../utils/makeRequest';
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Ellipsis,
  Button,
} from "./styled/styled";
import { useEffect, useState } from "react";
import { RockPaperScissorsGame } from "./Rock-paper-scissors-game";
import { Address } from "ton-core";
import { API_URL } from "../config";
import { PurchaseModal } from "./purchase.modal";
import { CircularProgress } from "@mui/material";

export let socket: any = {};

export const MainMenu = () => {
  // const { connected, sender, wallet } = useTonConnect();
  const [screen, setScreen] = useState('main');
  const [room, setRoom] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const wallet = useTonAddress();

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
        className={`Button Active`}
        onClick={() => {
          socket = io(API_URL, {
            transportOptions: {
              polling: {
                extraHeaders: {
                  // 'tg-data': (window as any)?.Telegram?.WebApp?.initData || '',
                  'tg-data': 'query_id=AAGhG3EZAAAAAKEbcRkoS98E&user=%7B%22id%22%3A426843041%2C%22first_name%22%3A%22Igor%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22peculiar37%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1719756135&hash=fa8b2000a45bdd3f5ab02785340ae95ed55b87409f9f9b972f1a6e67f14ef550'
                }
              }
            }
          })

          socket.on('gameReady', ({ room }: any) => {
            setRoom(room);
            setScreen('game');
          });

          console.log(socket);
          setIsSearching(true);
          socket.emit('checkRooms', { wallet });
        }}
      >
        Enter Queue
      </Button>
    );
  }

  return (
    <div className="Container">
      <Card>
          <h3>Rock Paper Scissors</h3>
          {getSearchButton()}
      </Card>
    </div>
  );
}
