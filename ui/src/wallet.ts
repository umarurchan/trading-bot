import { BrowserConnectClient } from '@gala-chain/connect';

export class GalaWallet {
	private client: BrowserConnectClient | null = null;
	public address: string | null = null;

	private ensureClient(): BrowserConnectClient {
		if (!this.client) {
			if (!(window as any).ethereum) throw new Error('Ethereum provider not found');
			this.client = new BrowserConnectClient((window as any).ethereum);
		}
		return this.client;
	}

	async connect(): Promise<string> {
		const c = this.ensureClient();
		this.address = await c.connect();
		return this.address;
	}

	async disconnect(): Promise<void> {
		this.client?.disconnect();
		this.address = null;
	}
}

export const galaWallet = new GalaWallet();