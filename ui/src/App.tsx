import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import StrategySelector from './components/StrategySelector';
import TradeAmountPanel from './components/TradeAmountPanel';
import StatsCards from './components/StatsCards';
import Portfolio from './components/Portfolio';
import RecentTrades from './components/RecentTrades';
import ProfitNotice from './components/ProfitNotice';
import type { Stats, StrategyKey, Token, Trade } from './types';

export default function App() {
	const [connected] = useState(false);
	const [address] = useState('0x886…bda9');
	const [botActive, setBotActive] = useState(false);
	const [strategy, setStrategy] = useState<StrategyKey>('arbitrage');
	const [token, setToken] = useState('GUSDC');
	const [amount, setAmount] = useState(50);

	const stats: Stats = { totalTrades: 0, successRatePct: 100, dailyTrades: 0, dailyTradesTarget: 5, netProfitText: '+0.00 GALA' };
	const tokens: Token[] = [
		{ symbol: 'GALA', name: 'Gala', quantity: 0, usdValue: 0 },
		{ symbol: 'MUSIC', name: 'Music', quantity: 0, usdValue: 0 },
		{ symbol: 'GUSDC', name: 'USDC', quantity: 0, usdValue: 0 },
		{ symbol: 'TOWN', name: 'Town', quantity: 0, usdValue: 0 },
	];
	const trades: Trade[] = [];

	return (
		<div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100">
			<div className="max-w-6xl mx-auto p-6 space-y-5">
				<Header connected={connected} address={address} onStart={() => setBotActive((v) => !v)} />
				<div className="text-sm text-gray-700">{botActive ? '😼 Bot is Active' : '🥱 Bot is Sleeping'}</div>
				<StrategySelector selected={strategy} onSelect={setStrategy} />
				<TradeAmountPanel amount={amount} onAmount={setAmount} token={token} onToken={setToken} />
				<StatsCards stats={stats} />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Portfolio tokens={tokens} />
					<RecentTrades trades={trades} />
				</div>
				<ProfitNotice />
			</div>
		</div>
	);
}
