import React from 'react';
import  BalanceUpdater  from "./components/ui/BalanceUpdater";

import './App.css';
// import { Button } from "./components/ui/button";
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

const projectId = 'a771d23a9e6f8d1abfd9189a6ee510aa';

const metadata = {
  name: 'Web3Modal',
}
const iconUrl = metadata.icons && metadata.icons.length > 0 ? metadata.icons[0] : null;

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: iconUrl
    })
  ]
})
// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
})

// import { useWeb3Modal } from '@web3modal/wagmi/react'

export default function App() {
  // const w3m = useWeb3Modal()

  return (
    <div>
      <WagmiProvider config={config}>
        <div>
          {/* <Button variant="destructive" onClick={({ }) => w3m.open()}>Connect your wallet</Button> */}

          <w3m-button />

          <BalanceUpdater />
        </div>
      </WagmiProvider>
    </div>

  )
}
