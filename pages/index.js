import { useEffect, useState } from 'react';
import { getEthUsdPrice } from '../lib/getEthUsdPrice';
import useGasStore from '../lib/store';
import { startGasTracking } from '../lib/gasFetcher';
import GasChart from '../components/GasChart';

const CHAINS = {
  ethereum: 'Ethereum',
  polygon: 'Polygon',
  arbitrum: 'Arbitrum',
};

export default function Home() {
  const [inputValue, setInputValue] = useState('0.01');
  const [usdCost, setUsdCost] = useState(null);

  const { gasData, chain, setChain } = useGasStore();

  useEffect(() => {
    startGasTracking();
  }, []);

  const handleSimulate = async () => {
    if (!inputValue || !chain || !gasData[chain]) return;

    const usdPrice = await getEthUsdPrice();
    const { baseFee, priorityFee } = gasData[chain];

    const txEth = parseFloat(inputValue);
    const gasCostEth = (baseFee + priorityFee) * 21000 / 1e9;
    const totalEth = gasCostEth + txEth;
    const costUsd = totalEth * usdPrice;

    setUsdCost(costUsd.toFixed(2));
  };

  const mockCandles = [
    {
      time: Math.floor(Date.now() / 1000) - 60 * 60,
      open: 3.1,
      high: 3.2,
      low: 3.0,
      close: 3.15,
    },
    {
      time: Math.floor(Date.now() / 1000) - 45 * 60,
      open: 3.15,
      high: 3.3,
      low: 3.1,
      close: 3.2,
    },
    {
      time: Math.floor(Date.now() / 1000) - 30 * 60,
      open: 3.2,
      high: 3.25,
      low: 3.1,
      close: 3.18,
    },
    {
      time: Math.floor(Date.now() / 1000) - 15 * 60,
      open: 3.18,
      high: 3.2,
      low: 3.15,
      close: 3.19,
    },
    {
      time: Math.floor(Date.now() / 1000),
      open: 3.19,
      high: 3.22,
      low: 3.18,
      close: 3.21,
    },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>⛽ Real-Time Gas Price Tracker</h1>

      <label>Transaction Value (ETH/MATIC/ARB):</label>
      <input
        type="number"
        step="0.01"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ margin: '0.5rem 0', padding: '0.5rem', width: '200px' }}
      />

      <br />

      <label>Select Chain:</label>
      <select
        value={chain}
        onChange={(e) => setChain(e.target.value)}
        style={{ margin: '0.5rem 0', padding: '0.5rem', width: '200px' }}
      >
        {Object.entries(CHAINS).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <br />

      <button
        onClick={handleSimulate}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Simulate
      </button>

      {usdCost && (
        <div style={{ marginTop: '1.5rem', fontSize: '1.2rem' }}>
          💸 Estimated USD gas cost on {CHAINS[chain].toUpperCase()}: <b>${usdCost}</b>
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h2>📊 Live Gas Data</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Chain</th>
            <th>Base Fee (Gwei)</th>
            <th>Priority Fee</th>
            <th>Block</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(gasData).map(([key, data]) =>
            data ? (
              <tr key={key}>
                <td>{CHAINS[key]}</td>
                <td>{data.baseFee}</td>
                <td>{data.priorityFee}</td>
                <td>{data.block}</td>
                <td>{data.time}</td>
              </tr>
            ) : (
              <tr key={key}>
                <td>{CHAINS[key]}</td>
                <td colSpan="4">Loading...</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <hr style={{ margin: '2rem 0' }} />

      <h2>📈 Gas Price Volatility (Candlestick)</h2>
      <GasChart data={mockCandles} />
    </div>
  );
}
