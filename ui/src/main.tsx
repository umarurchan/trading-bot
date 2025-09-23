import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GalaSwapTradingBot from './GalaSwapTradingBot'
import { galaWallet } from './wallet'

if (typeof window !== 'undefined') {
  (window as any).galaWallet = galaWallet
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GalaSwapTradingBot />
  </React.StrictMode>,
)
