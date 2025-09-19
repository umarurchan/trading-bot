import React from 'react';
import Card from './Card';
import type { Stats } from '../types';

type Props = { stats: Stats };

export default function StatsCards({ stats }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
			<Card>
				<div className="text-xs text-gray-500">Total Trades</div>
				<div className="text-lg font-semibold">{stats.totalTrades}</div>
			</Card>
			<Card>
				<div className="text-xs text-gray-500">Success Rate</div>
				<div className="text-lg font-semibold">{stats.successRatePct}%</div>
			</Card>
			<Card>
				<div className="text-xs text-gray-500">Daily Trades</div>
				<div className="text-lg font-semibold">{stats.dailyTrades}/{stats.dailyTradesTarget}</div>
			</Card>
			<Card>
				<div className="text-xs text-gray-500">Net Profit</div>
				<div className="text-lg font-semibold text-emerald-600">{stats.netProfitText}</div>
			</Card>
		</div>
	);
}
