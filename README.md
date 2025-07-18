# Real-Time Cross-Chain Gas Tracker

This project is a full-stack Web3 dashboard that fetches live gas prices from Ethereum, Polygon, and Arbitrum using native RPC endpoints (not third-party APIs). It allows users to simulate transaction costs in USD and visualizes gas price volatility using a candlestick chart.

## Features

- Real-time gas price tracking from native RPCs via WebSocket connections
- ETH/USD price calculation using Uniswap V3 Swap event logs
- Transaction cost simulation in USD for selected networks
- Interactive candlestick chart showing gas price volatility
- Zustand state management for mode switching and data sharing
- Built with Next.js and Ethers.js

## Tech Stack

- Frontend: Next.js (React)
- State Management: Zustand
- Web3 Integration: Ethers.js
- Charting: lightweight-charts
- Real-Time Updates: WebSocketProvider
- Hosted on: Vercel

## Getting Started

To run the project locally:

```bash
npm install
npm run dev
