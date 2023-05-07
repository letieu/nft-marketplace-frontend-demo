import { initializeConnector } from '@web3-react/core'
import { WalletConnect } from '@web3-react/walletconnect-v2'

import { MAINNET_CHAINS, TESTNET_CHAINS } from '../chains'

const mainChains = Object.keys(MAINNET_CHAINS).map(Number)
const testChains = Object.keys(TESTNET_CHAINS).map(Number)

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
        chains: [...mainChains, ...testChains],
        showQrModal: true,
      },
    })
)
