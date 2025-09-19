import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
function useSocket(url) {
    const socketRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
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
    const [health, setHealth] = useState('unknown');
    const [apiBase] = useState((() => {
        const u = new URL(window.location.href);
        return `${u.protocol}//${u.hostname}:3001`;
    })());
    const wsUrl = useMemo(() => apiBase.replace(/^http/, 'ws') + '/socket.io/?EIO=4&transport=websocket', [apiBase]);
    const { connected } = useSocket(wsUrl);
    const [walletAddr, setWalletAddr] = useState('');
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const r = await fetch(apiBase + '/api/health');
                const j = await r.json();
                if (!cancelled)
                    setHealth('ok at ' + j.time);
            }
            catch {
                if (!cancelled)
                    setHealth('offline');
            }
        }
        load();
        const t = setInterval(load, 5000);
        return () => { cancelled = true; clearInterval(t); };
    }, [apiBase]);
    useEffect(() => {
        const sock = window.io?.(apiBase, { transports: ['websocket'] });
        if (!sock)
            return;
        sock.on('connect', () => { });
        sock.on('log', (line) => {
            setLogs((prev) => [...prev, line].slice(-500));
        });
        return () => sock.close();
    }, [apiBase]);
    return (_jsx("div", { className: "min-h-screen bg-gray-50 text-gray-900", children: _jsxs("div", { className: "max-w-6xl mx-auto p-4 space-y-4", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "GalaSwap Bot Dashboard" }), _jsxs("div", { className: "text-sm", children: ["API: ", apiBase, " \u00B7 Health: ", _jsx("span", { className: health.startsWith('ok') ? 'text-green-600' : 'text-red-600', children: health }), " \u00B7 WS: ", connected ? 'connected' : 'disconnected'] })] }), _jsxs("section", { className: "bg-white shadow rounded p-4 space-y-3", children: [_jsx("h2", { className: "font-medium", children: "Wallet" }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("input", { className: "border rounded px-3 py-2 flex-1", placeholder: "eth|... GalaChain wallet address", value: walletAddr, onChange: (e) => setWalletAddr(e.target.value) }), _jsx("button", { className: "bg-black text-white px-4 py-2 rounded", children: "Connect" })] }), _jsx("p", { className: "text-xs text-gray-500", children: "GalaChain Wallet connect can be integrated here when available. For now, enter your address to personalize data." })] }), _jsxs("section", { className: "bg-white shadow rounded p-4", children: [_jsx("h2", { className: "font-medium mb-2", children: "Live Logs" }), _jsx("div", { className: "h-80 overflow-auto font-mono text-sm border rounded p-2 bg-gray-900 text-gray-100", children: logs.map((l, i) => (_jsxs("div", { className: l.level === 'error' ? 'text-red-400' : l.level === 'warn' ? 'text-yellow-300' : 'text-gray-200', children: ["[", l.ts, "] [", l.level, "] ", l.msg] }, i))) })] })] }) }));
}
//# sourceMappingURL=App.js.map