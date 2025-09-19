import 'dotenv/config';
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

type LogLine = { level: 'info' | 'error' | 'warn'; ts: string; msg: string };

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const logs: LogLine[] = [];
function pushLog(line: LogLine): void {
	logs.push(line);
	if (logs.length > 500) logs.shift();
	io.emit('log', line);
}

app.get('/api/health', (_req: Request, res: Response) => {
	res.json({ ok: true, time: new Date().toISOString() });
});

app.get('/api/logs', (_req: Request, res: Response) => {
	res.json({ logs });
});

// Placeholder wallet connect endpoints
app.post('/api/wallet/connect', (req: Request, res: Response) => {
	const { address } = req.body ?? {};
	if (!address) return res.status(400).json({ error: 'address required' });
	pushLog({ level: 'info', ts: new Date().toISOString(), msg: `Wallet connected: ${address}` });
	res.json({ ok: true });
});

io.on('connection', (socket) => {
	socket.emit('hello', { ts: new Date().toISOString() });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
server.listen(PORT, () => {
	pushLog({ level: 'info', ts: new Date().toISOString(), msg: `API server listening on :${PORT}` });
});

// Simple export to reuse logger from bot
export const Log = {
	info: (msg: string) => pushLog({ level: 'info', ts: new Date().toISOString(), msg }),
	warn: (msg: string) => pushLog({ level: 'warn', ts: new Date().toISOString(), msg }),
	error: (msg: string) => pushLog({ level: 'error', ts: new Date().toISOString(), msg }),
};

