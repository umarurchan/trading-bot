import React from 'react';
import Card from './Card';
import type { Trade } from '../types';

type Props = { trades: Trade[] };

export default function RecentTrades({ trades }: Props) {
	return (
		<Card title="Recent Trades">
			{trades.length === 0 ? (
				<div className="text-sm text-gray-500">No trades yet — Start trading to see your history here!</div>
			) : (
				<div className="space-y-2">
					{trades.map((t) => (
						<div key={t.id} className="flex items-center justify-between rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm">
							<div>
								<div className="font-medium">{t.pair}</div>
								<div className="text-xs text-gray-500">{t.timestamp.toLocaleTimeString()}</div>
							</div>
							<div className={`font-medium ${t.pnl >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{t.pnl >= 0 ? '+' : ''}{t.pnl.toFixed(2)}</div>
						</div>
					))}
				</div>
			)}
		</Card>
	);
}
