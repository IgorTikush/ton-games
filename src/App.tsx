import io from 'socket.io-client';
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import styled from "styled-components";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";

import "./App.css";

import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import { Button, Card, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { MainMenu } from "./components/MainMenu";
import { createContext, useEffect, useState } from 'react';
import { makeRequest } from './utils/makeRequest';
import { API_URL } from './config';
import { PurchaseModal } from './components/purchase.modal';
import { CircularProgress } from '@mui/material';

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const socket = io(API_URL);

async function loadTelegramSDK() {
  const script = document.createElement('script');
  script.src = "https://telegram.org/js/telegram-web-app.js";
  script.async = true;
  script.onload = () => {
      if ((window as any).Telegram.WebApp) {
          const res = (window as any).Telegram.WebApp.ready();
          // console.log(res);
          console.log("Telegram WebApp SDK loaded and ready.");
      }
  };
  document.body.appendChild(script);
}

const UserContext = createContext(null);

function App() {
  const { network } = useTonConnect();
  const wallet = useTonAddress()

  const [user, setUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isWithdrawInProgress, setIsWithdrawInProgress] = useState(false);

  useEffect(() => {
    loadTelegramSDK()
  }, []);

  useEffect(() => {
    if (wallet) {
      makeRequest({
        url: `${API_URL}/user-info`,
        wallet,
        method: 'POST',
      })
      .then((userInfo) => {
        setUser(userInfo);
        console.log('userinfo', userInfo);
      })
      .catch((error) => console.log('Failed to fetch user info', error));
    }
  }, [wallet]);

  const withdraw = () => {
    setIsWithdrawInProgress(true);
    makeRequest({ url: `${API_URL}/withdraw`, wallet, method: 'POST'}).finally(() => setIsWithdrawInProgress(false));
  }

  const handleOpen = () => {
      setOpenModal(true);
  };

   const handleClose = () => {
      setOpenModal(false);
  };

  const getWithdrawButton = () => {
      return (
      <Button style={{ marginLeft: '20px' }} onClick={withdraw}>
        {isWithdrawInProgress ? <CircularProgress size={24} color="inherit" /> : 'Withdraw'}
      </Button>
    )
  }

  const getBalanceButton = () => {
    console.log('balance', user?.balance)
    if (user?.balance) {
      return (
        <div style={{ marginLeft: 'auto' }}> 
          balance: {user?.balance.toFixed(1)}
          {getWithdrawButton()}
        </div>
      )
    }
    return (
      <Button style={{ marginLeft: 'auto' }} onClick={handleOpen}>
        Buy Tokens
      </Button>
      )
  }

  const getGamesMenu = () => {
    if (user?.balance) {
      return (
        <MainMenu />
      )
    }
  }

  return (
    <StyledApp>
      <UserContext.Provider value={user}>
        <PurchaseModal open={openModal} handleClose={handleClose} />
        <AppContainer>
          <FlexBoxCol>
            <FlexBoxRow>
              <TonConnectButton />
              <Button>
                {network
                  ? network === CHAIN.MAINNET
                    ? "mainnet"
                    : "testnet"
                  : "N/A"}
              </Button>
              {getBalanceButton()}
            </FlexBoxRow>
            {getGamesMenu()}
            
            {/* <Counter /> */}
            {/* <TransferTon />
            <Jetton /> */}
          </FlexBoxCol>
        </AppContainer>
      </UserContext.Provider>
    </StyledApp>
  );
}

export default App;
