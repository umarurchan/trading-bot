export function formatCurrencyUSD(value: number): string {
	return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
}

export function formatPercent(value: number): string {
	return `${value.toFixed(0)}%`;
}

export function formatToken(value: number, decimals = 2): string {
	return value.toFixed(decimals);
}
