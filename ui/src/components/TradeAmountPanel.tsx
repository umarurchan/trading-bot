import Card from './Card';
import { formatCurrencyUSD } from '../lib/format';

type Props = {
	amount: number;
	onAmount: (n: number) => void;
	token: string;
	onToken: (s: string) => void;
};

const PRESETS = [5, 10, 25, 50];

export default function TradeAmountPanel({ amount, onAmount, token, onToken }: Props) {
	return (
		<Card title="Set Trading Amount">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
				<div className="space-y-1">
					<label className="text-xs text-gray-600">Token</label>
					<select value={token} onChange={(e) => onToken(e.target.value)} className="w-full border rounded-lg px-3 py-2">
						<option value="GUSDC">GUSDC (0.00)</option>
						<option value="GALA">GALA (0.00)</option>
					</select>
				</div>
				<div className="space-y-1">
					<label className="text-xs text-gray-600">Amount</label>
					<div className="flex items-center gap-2">
						<input value={amount} onChange={(e) => onAmount(Number(e.target.value || 0))} type="number" min={0} step={0.01} className="w-full border rounded-lg px-3 py-2" />
						<span className="text-xs px-2 py-1 rounded-full bg-gray-100 border border-gray-200">10%</span>
					</div>
				</div>
				<div className="flex gap-2 md:justify-end">
					{PRESETS.map((p) => (
						<button key={p} onClick={() => onAmount(p)} className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm">{p}</button>
					))}
				</div>
			</div>
			<div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
				<div className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">Trading with: <span className="font-medium">{amount} {token}</span> per trade</div>
				<div className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">Estimated USD: <span className="font-medium">{formatCurrencyUSD(amount)}</span></div>
				<div className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">Live Price: <span className="font-medium">{token} = $1.0000</span></div>
			</div>
		</Card>
	);
}
