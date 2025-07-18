import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/MDugdM4cUEKNZg4DqnCQRDXL1aR0mEya');
// Chainlink ETH/USD price feed address on Ethereum mainnet
const CHAINLINK_ADDRESS = '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419';
const AGGREGATOR_INTERFACE = ["function latestAnswer() view returns (int256)"];

export async function getEthUsdPrice() {
  try {
    const contract = new (require('ethers').Contract)(CHAINLINK_ADDRESS, AGGREGATOR_INTERFACE, provider);
    const answer = await contract.latestAnswer();
    const price = Number(answer) / 1e8; // Chainlink gives 8 decimals
    return price.toFixed(2); // e.g. "3245.12"
  } catch (e) {
    console.error('Chainlink price fetch failed', e);
    return "0";
  }
}
