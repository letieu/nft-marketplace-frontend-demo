import { MetaMask } from "@web3-react/metamask"
import type { WalletConnect } from '@web3-react/walletconnect-v2'
import { metaMask, hooks as metaMaskHooks } from "./connectors/metamask"
import { walletConnect, hooks as walletConnectHooks } from "./connectors/wallet-connect"
import { Web3ReactHooks } from "@web3-react/core"

type Connector = [MetaMask | WalletConnect, Web3ReactHooks];

export const connectors: Connector[] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
]
