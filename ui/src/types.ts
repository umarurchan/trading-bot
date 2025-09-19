export type StrategyKey = 'arbitrage' | 'market-making' | 'trend-follow';

export interface Token {
	symbol: string;
	name: string;
	quantity: number; // token units
	usdValue: number; // USD equivalent
}

export interface Trade {
	id: string;
	pair: string;
	signal: 'BUY' | 'SELL';
	amount: number;
	price: number;
	timestamp: Date;
	pnl: number; // profit in token or USD depending on context
}

export interface Stats {
	totalTrades: number;
	successRatePct: number; // 0-100
	dailyTrades: number;
	dailyTradesTarget: number;
	netProfitText: string; // e.g. +0.00 GALA
}
