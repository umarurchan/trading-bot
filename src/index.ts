import 'dotenv/config';
import { z } from 'zod';
import { GSwap, PrivateKeySigner } from '@gala-chain/gswap-sdk';
import { Log, startServer } from './server.js';

const EnvSchema = z.object({
	GALA_PRIVATE_KEY: z.string().min(64).optional(),
	GALA_WALLET_ADDRESS: z.string().min(4).optional(),
	GS_API_BASE: z.string().url().optional(),
	POLL_INTERVAL_MS: z
		.string()
		.default('5000')
		.transform((v) => parseInt(v, 10))
		.pipe(z.number().int().positive()),
});

const env = EnvSchema.parse(process.env);

const signer = env.GALA_PRIVATE_KEY ? new PrivateKeySigner(env.GALA_PRIVATE_KEY) : undefined;
const gswapOptions: any = { signer };
if (env.GS_API_BASE) {
	gswapOptions.gatewayBaseUrl = env.GS_API_BASE;
}
const gswap = new GSwap(gswapOptions);

async function tick(): Promise<void> {
	// Example: quote GUSDC -> GALA for 10 units and log
	try {
		const inToken = 'GUSDC|Unit|none|none';
		const outToken = 'GALA|Unit|none|none';
		const amount = 10;
		const quote = await gswap.quoting.quoteExactInput(inToken, outToken, amount);
		const line = `Quote: ${amount} ${inToken} -> ~${quote.outTokenAmount.toString()} ${outToken} on fee tier ${quote.feeTier}`;
		console.log(line);
		Log.info(line);
	} catch (err) {
		console.error('Quote error:', err);
		Log.error(`Quote error: ${String(err)}`);
	}
}

async function main(): Promise<void> {
	console.log('GalaSwap bot starting...');
	if (env.GS_API_BASE) console.log('API base override:', env.GS_API_BASE);
	// Ensure server is started if not already
	startServer();

	const interval = setInterval(() => {
		void tick();
	}, env.POLL_INTERVAL_MS);

	process.on('SIGINT', () => {
		clearInterval(interval);
		console.log('Shutting down...');
		process.exit(0);
	});
}

void main();

