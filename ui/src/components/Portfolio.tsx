import Card from './Card';
import type { Token } from '../types';
import { RefreshCw, ArrowLeftRight, Target } from 'lucide-react';
import { formatCurrencyUSD, formatToken } from '../lib/format';

type Props = { tokens: Token[] };

export default function Portfolio({ tokens }: Props) {
	const total = tokens.reduce((s, t) => s + t.usdValue, 0);
	return (
		<Card title="Your Portfolio" footer={<div className="flex items-center justify-between"><div>Total Portfolio Value — {formatCurrencyUSD(total)}</div><div>Today’s Profit — +$0.00</div></div>}>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
				{tokens.map((t) => (
					<div key={t.symbol} className="rounded-xl border border-gray-200 p-3 bg-white">
						<div className="text-xs text-gray-500">{t.symbol}</div>
						<div className="text-sm font-medium">{formatToken(t.quantity)} <span className="text-gray-500">/ {formatCurrencyUSD(t.usdValue)}</span></div>
					</div>
				))}
			</div>
			<div className="mt-3 flex items-center gap-2 text-gray-500">
				<RefreshCw size={16} />
				<ArrowLeftRight size={16} />
				<Target size={16} />
			</div>
		</Card>
	);
}
