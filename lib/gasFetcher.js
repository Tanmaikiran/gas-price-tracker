import { WebSocketProvider } from 'ethers';
import useGasStore from './store';

const RPC_URLS = {
  ethereum: 'wss://eth-mainnet.g.alchemy.com/v2/MDugdM4cUEKNZg4DqnCQRDXL1aR0mEya',
  polygon: 'wss://polygon-mainnet.g.alchemy.com/v2/MDugdM4cUEKNZg4DqnCQRDXL1aR0mEya',
  arbitrum: 'wss://arb-mainnet.g.alchemy.com/v2/MDugdM4cUEKNZg4DqnCQRDXL1aR0mEya',
};

export function startGasTracking() {
  const { setGasData } = useGasStore.getState();

  Object.entries(RPC_URLS).forEach(([chain, url]) => {
    try {
      const provider = new WebSocketProvider(url);

      provider.on('block', async (blockNumber) => {
        const block = await provider.getBlock(blockNumber);

        const baseFee = parseFloat(block.baseFeePerGas?.toString() || '0') / 1e9;
        const priorityFee = 2; // Default if not available

        setGasData(chain, {
          baseFee: Number(baseFee.toFixed(3)),
          priorityFee,
          block: blockNumber,
          time: new Date().toLocaleTimeString(),
        });
      });
    } catch (err) {
      console.error(`WebSocket failed for ${chain}:`, err);
    }
  });
}
