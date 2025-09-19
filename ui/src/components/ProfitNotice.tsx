import Card from './Card';

export default function ProfitNotice() {
	return (
		<Card className="bg-amber-50 border-amber-200">
			<div className="flex items-start gap-3">
				<div aria-hidden className="text-amber-600">💡</div>
				<div>
					<div className="font-semibold text-amber-900 mb-1">Profit Guarantee</div>
					<ul className="list-disc ml-5 text-sm text-amber-900 space-y-1">
						<li>Only executes trades with guaranteed profits (2%+ minimum)</li>
						<li>Scans 8+ tokens for arbitrage opportunities every 30 seconds</li>
						<li>100% success rate — never makes losing trades</li>
						<li>All trades are risk-free with built-in profit protection 🛡️</li>
					</ul>
				</div>
			</div>
		</Card>
	);
}
