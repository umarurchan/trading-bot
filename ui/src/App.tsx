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
	const tokenApiBase = apiBase.replace('3001', '3001');
	const wsUrl = useMemo(() => apiBase.replace(/^http/, 'ws') + '/socket.io/?EIO=4&transport=websocket', [apiBase]);
	const { connected } = useSocket(wsUrl);
	const [walletAddr, setWalletAddr] = useState('');
	const [connecting, setConnecting] = useState(false);
	const [connectedAddr, setConnectedAddr] = useState<string | null>(null);
	const [balances, setBalances] = useState<any[]>([]);
	const [logs, setLogs] = useState<{ts:string;level:string;msg:string}[]>([]);

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
		try {
			const addr = await galaWallet.connect();
			setConnectedAddr(addr);
			setWalletAddr(addr);
			await fetch(apiBase + '/api/wallet/connect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address: addr }) });
			const bals = await galaWallet.fetchBalances(tokenApiBase);
			setBalances(bals);
		} catch (e) {
			alert('Wallet connect failed: ' + (e as Error).message);
		} finally {
			setConnecting(false);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			<div className="max-w-6xl mx-auto p-4 space-y-4">
				<header className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold">GalaSwap Bot Dashboard</h1>
					<div className="text-sm">API: {apiBase} · Health: <span className={health.startsWith('ok') ? 'text-green-600' : 'text-red-600'}>{health}</span> · WS: {connected ? 'connected' : 'disconnected'}</div>
				</header>
				<section className="bg-white shadow rounded p-4 space-y-3">
					<h2 className="font-medium">Wallet</h2>
					<div className="flex gap-2 items-center">
						<input className="border rounded px-3 py-2 flex-1" placeholder="eth|... GalaChain wallet address" value={walletAddr} onChange={(e)=>setWalletAddr(e.target.value)} />
						<button disabled={connecting || !walletAddr} onClick={async()=>{
							setConnecting(true);
							try {
								await fetch(apiBase + '/api/wallet/connect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address: walletAddr }) });
								setConnectedAddr(walletAddr);
								const bals = await galaWallet.fetchBalances(tokenApiBase).catch(()=>[]);
								setBalances(bals);
							} finally {
								setConnecting(false);
							}
						}} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">{connecting ? 'Connecting...' : 'Use Address'}</button>
						<button onClick={connectWithMetaMask} className="bg-orange-500 text-white px-4 py-2 rounded">Connect MetaMask</button>
					</div>
					{connectedAddr && (<div className="text-sm text-gray-600">Connected: {connectedAddr}</div>)}
				</section>
				<section className="bg-white shadow rounded p-4">
					<h2 className="font-medium mb-2">Balances</h2>
					<div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
						{balances.map((b: any, i: number) => (
							<div key={i} className="border rounded p-2">
								<div className="font-mono text-xs text-gray-500">{b.classKey?.collection}|{b.classKey?.category}|{b.classKey?.type}|{b.classKey?.additionalKey}</div>
								<div className="flex justify-between"><span>{b.classKey?.type}</span><span>{b.balance}</span></div>
							</div>
						))}
						{!balances.length && <div className="text-gray-500">No balances loaded</div>}
					</div>
				</section>
				<section className="bg-white shadow rounded p-4">
					<h2 className="font-medium mb-2">Live Logs</h2>
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
