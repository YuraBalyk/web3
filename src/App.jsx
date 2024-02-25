

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_PROJECT_ID;


// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
}

const chains = [mainnet, arbitrum];

const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
})

export default function App ({ children }) {
  return (
    <WagmiProvider config={config}>
      <w3m-button />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}


