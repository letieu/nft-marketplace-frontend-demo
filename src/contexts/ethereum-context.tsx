import React, { useState, useContext, useEffect } from 'react';
import {ethers } from 'ethers';

interface EthereumContextType {
  provider: ethers.BrowserProvider | null;
  account: string | null;
  chainId: string;

  connect: () => Promise<ethers.BrowserProvider | null>;
  disconnect: () => Promise<void>;
}

const EthereumContext = React.createContext<EthereumContextType>({
  provider: null,
  account: null,
  chainId: '',

  connect: () => Promise.resolve(null),
  disconnect: () => Promise.resolve(),
});

// fix window.ethereum is undefined
declare global {
  interface Window {
    ethereum: any;
  }
}

export function useEthereum() {
  return useContext(EthereumContext);
}

export function EthereumProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [chainId, setChainId] = useState<string>('');
  const [account, setAccount] = useState<string | null>(null);

  async function connect() {
    const newProvider = new ethers.BrowserProvider(window.ethereum);
    await newProvider.send('eth_requestAccounts', []);
    const signer = await newProvider.getSigner();

    const userAddresses = await signer.getAddress();
    setAccount(userAddresses);

    const network = await newProvider.getNetwork();
    setChainId(network.chainId.toString());

    setProvider(newProvider);

    return newProvider;
  }

  async function disconnect() {
    if (provider) {
      provider.destroy();
      setProvider(null);
      setAccount(null);
      setChainId('');
    }
  }

  // listen to chainId change, account change
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        setChainId(chainId);
      });
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0]);
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        window.ethereum.removeListener('chainChanged', () => {});
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    }
  }, []);

  const value = {
    provider,
    account,
    chainId,

    connect,
    disconnect,
  };

  return <EthereumContext.Provider value={value}>{children}</EthereumContext.Provider>;
}
