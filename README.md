# trading-bot
GalaSwap Trading Bot (TypeScript)

Quick start
- Copy .env.example to .env and fill in required values
- Install deps: npm install
- Run in dev: npm run dev
- Build and run: npm run build && npm start

Environment
- GALA_PRIVATE_KEY: hex private key for signing (optional for read-only)
- GALA_WALLET_ADDRESS: your GalaChain wallet address (optional)
- GS_API_BASE: optional gateway override; leave empty to use SDK defaults
- POLL_INTERVAL_MS: loop delay in ms (default: 5000)
 - GATEWAY_BASE: base URL for GalaChain gateway (for backend proxy), e.g. https://gateway.example.com

Warning
Automated trading is risky. Test thoroughly and use at your own risk.
