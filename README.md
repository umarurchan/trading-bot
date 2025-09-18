# trading-bot
GalaSwap Trading Bot (TypeScript)

Quick start
- Copy .env.example to .env and fill in required values
- Install deps: npm install
- Run in dev: npm run dev
- Build and run: npm run build && npm start

Environment
- GALA_PRIVATE_KEY: hex private key for signing
- GALA_WALLET_ADDRESS: your GalaChain wallet address (e.g., eth|...)
- GS_API_BASE: base URL for gSwap API (default: https://swap.gala.com)
- POLL_INTERVAL_MS: loop delay in ms (default: 5000)

Warning
Automated trading is risky. Test thoroughly and use at your own risk.
