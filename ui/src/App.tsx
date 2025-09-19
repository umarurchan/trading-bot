import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css'
import { galaWallet } from './wallet';

function useSocket(url: string) {
	const socketRef = useRef<WebSocket | null>(null);
	const [connected, setConnected] = useState(false);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		const ws = new WebSocket(url);
		socketRef.current = ws;
		ws.onopen = () => setConnected(true);
		ws.onclose = () => setConnected(false);
		ws.onmessage = (e) => {
			setMessages((prev) => [...prev, e.data].slice(-500));
		};
		return () => ws.close();
	}, [url]);

	return { connected, messages };
}

export default function App() {
	const [health, setHealth] = useState<string>('unknown');
	const [apiBase] = useState<string>(
		(() => {
			const u = new URL(window.location.href);
			return `${u.protocol}//${u.hostname}:3001`;
		})()
	);
	const [tokenApiUrl, setTokenApiUrl] = useState<string>(() => localStorage.getItem('tokenApiUrl') || '');
	useEffect(()=>{ localStorage.setItem('tokenApiUrl', tokenApiUrl); }, [tokenApiUrl]);
	const wsUrl = useMemo(() => apiBase.replace(/^http/, 'ws') + '/socket.io/?EIO=4&transport=websocket', [apiBase]);
	const { connected } = useSocket(wsUrl);
	const [walletAddr, setWalletAddr] = useState('');
	const [connecting, setConnecting] = useState(false);
	const [connectedAddr, setConnectedAddr] = useState<string | null>(null);
	const [balances, setBalances] = useState<any[]>([]);
	const [logs, setLogs] = useState<{ts:string;level:string;msg:string}[]>([]);
	const [startAmount, setStartAmount] = useState<string>('10');
	const [uiError, setUiError] = useState<string>('');

	useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				const r = await fetch(apiBase + '/api/health');
				const j = await r.json();
				if (!cancelled) setHealth('ok at ' + j.time);
			} catch {
				if (!cancelled) setHealth('offline');
			}
		}
		load();
		const t = setInterval(load, 5000);
		return () => { cancelled = true; clearInterval(t); };
	}, [apiBase]);

	useEffect(() => {
		const sock = (window as any).io?.(apiBase, { transports: ['websocket'] });
		if (!sock) return;
		sock.on('connect', () => {});
		sock.on('log', (line: any) => {
			setLogs((prev) => [...prev, line].slice(-500));
		});
		return () => sock.close();
	}, [apiBase]);

	async function connectWithMetaMask() {
		setConnecting(true);
		setUiError('');
		try {
			const addr = await galaWallet.connect();
			setConnectedAddr(addr);
			setWalletAddr(addr);
			await fetch(apiBase + '/api/wallet/connect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address: addr }) });
			if (tokenApiUrl) {
				const bals = await galaWallet.fetchBalances(tokenApiUrl);
				setBalances(bals);
			}
		} catch (e) {
			setUiError((e as Error).message || 'Wallet connect failed');
		} finally {
			setConnecting(false);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 text-gray-900">
			<div className="max-w-6xl mx-auto p-6 space-y-6">
				<header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">GalaSwap Bot</h1>
					<div className="text-sm">API: {apiBase} · Health: <span className={health.startsWith('ok') ? 'text-green-700' : 'text-red-600'}>{health}</span> · WS: {connected ? 'connected' : 'disconnected'}</div>
				</header>

				<section className="grid md:grid-cols-3 gap-6">
					<div className="md:col-span-2 bg-white/80 backdrop-blur rounded-xl shadow p-5 space-y-4">
						<h2 className="font-semibold text-lg">Quick Start</h2>
						<ol className="list-decimal ml-5 space-y-1 text-sm text-gray-700">
							<li>Connect your wallet (MetaMask) or paste a GalaChain address.</li>
							<li>Enter your GalaChain Token API URL (from your Gateway), then fetch balances.</li>
							<li>Select a starting amount and press Start Bot.</li>
							<li>Watch live logs and status below.</li>
						</ol>
						{uiError && <div className="text-sm text-red-600">{uiError}</div>}
						<div className="flex flex-col md:flex-row gap-2 items-stretch">
							<input className="border rounded px-3 py-2 flex-1" placeholder="eth|... GalaChain wallet address" value={walletAddr} onChange={(e)=>setWalletAddr(e.target.value)} />
							<button disabled={connecting || !walletAddr} onClick={async()=>{
								setConnecting(true);
								setUiError('');
								try {
									await fetch(apiBase + '/api/wallet/connect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address: walletAddr }) });
									setConnectedAddr(walletAddr);
									if (tokenApiUrl) {
										const bals = await galaWallet.fetchBalances(tokenApiUrl).catch(()=>[]);
										setBalances(bals);
									}
								} catch(e) { setUiError('Failed to use address'); } finally { setConnecting(false); }
							}} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">{connecting ? 'Connecting...' : 'Use Address'}</button>
							<button onClick={connectWithMetaMask} className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-4 py-2 rounded">Connect MetaMask</button>
						</div>
						<div className="grid md:grid-cols-2 gap-3">
							<div className="space-y-2">
								<label className="text-sm font-medium">GalaChain Token API URL</label>
								<input className="border rounded px-3 py-2 w-full" placeholder="https://gateway.example.com/api/asset/token-contract" value={tokenApiUrl} onChange={(e)=>setTokenApiUrl(e.target.value)} />
								<div className="text-xs text-gray-500">Example path usually ends with <code className="font-mono">/api/asset/token-contract</code>.</div>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Start Amount</label>
								<div className="flex gap-2">
									<input className="border rounded px-3 py-2 w-full" type="number" min="0" step="0.0001" value={startAmount} onChange={(e)=>setStartAmount(e.target.value)} />
									<button onClick={async()=>{
										await fetch(apiBase + '/api/bot/start', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: startAmount }) });
									}} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded">Start Bot</button>
								</div>
								<div className="text-xs text-gray-500">This amount guides the initial trade size; you can stop anytime.</div>
							</div>
						</div>
						{connectedAddr && (<div className="text-sm text-gray-700">Connected: {connectedAddr}</div>)}
					</div>

					<div className="bg-white/80 backdrop-blur rounded-xl shadow p-5">
						<h2 className="font-semibold mb-2">Balances</h2>
						<div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
							{balances.map((b: any, i: number) => (
								<div key={i} className="border rounded p-3 bg-white">
									<div className="font-mono text-xs text-gray-500">{b.collection}|{b.category}|{b.type}|{b.additionalKey}</div>
									<div className="flex justify-between"><span className="font-medium">{b.type}</span><span>{String(b.quantity)}</span></div>
								</div>
							))}
							{!balances.length && <div className="text-gray-500">No balances loaded</div>}
						</div>
					</div>
				</section>

				<section className="bg-white/80 backdrop-blur rounded-xl shadow p-5">
					<h2 className="font-semibold mb-2">Live Logs</h2>
					<div className="h-80 overflow-auto font-mono text-sm border rounded p-2 bg-gray-900 text-gray-100">
						{logs.map((l, i) => (
							<div key={i} className={l.level === 'error' ? 'text-red-400' : l.level === 'warn' ? 'text-yellow-300' : 'text-gray-200'}>
								[{l.ts}] [{l.level}] {l.msg}
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
