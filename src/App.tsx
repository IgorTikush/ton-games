import io from 'socket.io-client';
import { TonConnectButton } from "@tonconnect/ui-react";
import styled from "styled-components";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";

import "./App.css";

import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { MainMenu } from "./components/MainMenu";

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

export const socket = io(`http://localhost:3000`);

if ((window as any).Telegram.WebApp) {
  console.log('inited');
  (window as any).Telegram.WebApp.ready();
}

function App() {
  const { network } = useTonConnect();

  return (
    <StyledApp>
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
          </FlexBoxRow>
          <MainMenu />
          {/* <Counter /> */}
          {/* <TransferTon />
          <Jetton /> */}
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
