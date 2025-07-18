import { create } from 'zustand';

const useGasStore = create((set) => ({
  mode: 'live', // or 'simulate'
  gasData: {
    ethereum: null,
    polygon: null,
    arbitrum: null,
  },
  setMode: (newMode) => set({ mode: newMode }),
  setGasData: (chain, data) =>
    set((state) => ({
      gasData: {
        ...state.gasData,
        [chain]: data,
      },
    })),
}));

export default useGasStore;
