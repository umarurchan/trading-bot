import React from 'react';
import Card from './Card';
import { Zap, BarChart3, TrendingUp, Settings } from 'lucide-react';
import type { StrategyKey } from '../types';

type Props = {
	selected: StrategyKey;
	onSelect: (s: StrategyKey) => void;
};

const options: { key: StrategyKey; label: string; subtitle: string; icon: React.ElementType }[] = [
	{ key: 'arbitrage', label: 'Arbitrage', subtitle: 'High Profit', icon: Zap },
	{ key: 'market-making', label: 'Market Making', subtitle: 'Steady Income', icon: BarChart3 },
	{ key: 'trend-follow', label: 'Trend Follow', subtitle: 'Long Term', icon: TrendingUp },
];

export default function StrategySelector({ selected, onSelect }: Props) {
	return (
		<Card>
			<div className="flex items-center justify-between mb-3">
				<h2 className="font-semibold">Trading Strategy</h2>
				<button className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-800">
					<Settings size={14} /> Configure
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				{options.map(({ key, label, subtitle, icon: Icon }) => {
					const isActive = key === selected;
					return (
						<button key={key} aria-pressed={isActive} onClick={() => onSelect(key)} className={`text-left rounded-xl px-3 py-3 border transition focus:outline-none focus:ring-2 focus:ring-emerald-300 ${isActive ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
							<div className="flex items-center gap-2">
								<Icon className={isActive ? 'text-emerald-600' : 'text-gray-500'} size={18} />
								<div>
									<div className="text-sm font-medium">{label}</div>
									<div className="text-xs text-gray-500">{subtitle}</div>
								</div>
							</div>
						</button>
					);
				})}
			</div>
		</Card>
	);
}
