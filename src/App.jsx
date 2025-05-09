import { useState } from 'react';
import WormholeConnect from '@wormhole-foundation/wormhole-connect';
import { RPCSelector } from './components/RPCSelector';

const App = () => {
  const [config, setConfig] = useState({
    network: 'Mainnet',
    chains: [
      "Ethereum",
      "Solana",
      "Arbitrum",
      "Bsc",
      "Polygon",
      "Base",
      "Terra",
      "Avalanche",
      "Oasis",
      "Algorand",
      "Aurora",
      "Fantom",
      "Karura",
      "Acala",
      "Klaytn",
      "Celo",
      "Near",
      "Moonbeam",
      "Neon",
      "Terra2",
      "Injective",
      "Osmosis",
      "Sui"
    ],
    rpcs: {
      Solana: 'https://mainnet.helius-rpc.com/?api-key=a16e5eed-e371-4d3d-ace0-169df4d3dfde',
      Ethereum: 'https://rpc.ankr.com/eth/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
      Arbitrum: 'https://rpc.ankr.com/arbitrum/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
      Bsc: 'https://rpc.ankr.com/bsc/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
      Polygon: 'https://rpc.ankr.com/polygon/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
      Base: 'https://rpc.ankr.com/base/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
      Avalanche: 'https://rpc.ankr.com/avalanche/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
      Celo: 'https://rpc.ankr.com/celo/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
      Moonbeam: 'https://rpc.ankr.com/moonbeam/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
      Sui: 'https://rpc.ankr.com/sui/3e9ecdbc3076f111c0ca53ddac26263619541b34713e23ca558c97ce87fc607e',
    }
  });

  const handleRPCChange = (rpcUrl) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      rpcs: {
        ...prevConfig.rpcs,
        Solana: rpcUrl
      }
    }));
    console.log(rpcUrl);
  };

  return (
    <div className='bg-black min-h-screen p-4'>
      <div className="max-w-lg mx-auto mb-6">
        <RPCSelector onRPCChange={handleRPCChange} config={config} />
      </div>
      <WormholeConnect config={config} />
    </div>
  );
};

export default App;
