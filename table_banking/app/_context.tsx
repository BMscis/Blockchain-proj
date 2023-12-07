'use client';
import { algodConfig } from '@/utils/ellipseAddress';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { DaffiWalletConnect } from '@daffiwallet/connect';
import { PeraWalletConnect } from '@perawallet/connect';
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet';
import algosdk from 'algosdk';
import { SnackbarProvider } from 'notistack';
import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';
const providersArray: ProvidersArray = [
  { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
  { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
  { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
  { id: PROVIDER_ID.EXODUS },
  // If you are interested in WalletConnect v2 provider
  // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
];

// Define the types
interface WalletState {
  balance: number;
}

type WalletAction = { type: 'DEPOSIT'; amount: number } | { type: 'WITHDRAW'; amount: number };

interface WalletContextProps {
  state: WalletState;
  dispatch: React.Dispatch<WalletAction>;
  toggleWalletModal: (toggle?: boolean) => void;
  openWalletModal: boolean;
}

// Initial state for the wallet
const initialWalletState: WalletState = {
  balance: 0,
};

// Create the context
const WalletContext = createContext<WalletContextProps | undefined>(undefined);

// Define the reducer function
const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'DEPOSIT':
      return { ...state, balance: state.balance + action.amount };
    case 'WITHDRAW':
      return { ...state, balance: state.balance - action.amount };
    default:
      return state;
  }
};

// Create a provider component for the context
interface LocalWalletProps {
  children: ReactNode;
}

export const LocalWallet: React.FC<LocalWalletProps> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialWalletState);
  const [address, setAddress] = useState();

  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  });
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false);
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false);

  const toggleWalletModal = (toggle?: boolean) => {
    toggle ? setOpenDemoModal(toggle) : setOpenWalletModal(!openWalletModal);
  };

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal);
  };

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal);
  };
  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider value={walletProviders}>
        <WalletContext.Provider value={{ state, dispatch, toggleWalletModal, openWalletModal }}>{children}</WalletContext.Provider>
      </WalletProvider>
    </SnackbarProvider>
  );
};

// Create a custom hook for using the Wallet context
export const useLocalWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a LocalWallet');
  }
  return context;
};
