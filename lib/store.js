import { create } from 'zustand';

const useGasStore = create((set) => ({
  mode: 'live', // or 'simulate'
  chain: 'ethereum',
  gasData: {
    ethereum: null,
    polygon: null,
    arbitrum: null,
  },
  setMode: (mode) => set({ mode }),
  setChain: (chain) => set({ chain }),
  setGasData: (chain, data) =>
    set((state) => ({
      gasData: {
        ...state.gasData,
        [chain]: data,
      },
    })),
}));

export default useGasStore;
