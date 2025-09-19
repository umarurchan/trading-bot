import { Cog, Play } from 'lucide-react';

type Props = {
	connected: boolean;
	address?: string;
	onStart?: () => void;
};

export default function Header({ connected, address, onStart }: Props) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="text-2xl">🤖✨</div>
				<div>
					<h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">GalaSwap Trading Bot</h1>
					<p className="text-gray-600 text-sm">Your cute companion for profitable crypto trading! 💎</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				{connected && address ? (
					<div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
						<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
						<span className="text-xs font-medium text-emerald-800">MetaMask {address.slice(0, 6)}…{address.slice(-4)}</span>
					</div>
				) : (
					<div className="text-xs text-gray-500">Not connected</div>
				)}
				<button onClick={onStart} className="hidden md:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full text-sm">
					<Play size={14} /> Start Trading
				</button>
				<button aria-label="Settings" className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
					<Cog size={16} />
				</button>
			</div>
		</div>
	);
}
