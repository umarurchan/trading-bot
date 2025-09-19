import { BrowserConnectClient, TokenApi } from '@gala-chain/connect';

export class GalaWallet {
	private client = new BrowserConnectClient();
	public address: string | null = null;

	async connect(): Promise<string> {
		this.address = await this.client.connect();
		return this.address;
	}

	async disconnect(): Promise<void> {
		this.client.disconnect();
		this.address = null;
	}

	async fetchBalances(tokenApiBase: string) {
		if (!this.address) throw new Error('Not connected');
		const tokenApi = new TokenApi(tokenApiBase, this.client);
		const resp = await tokenApi.FetchBalances({ owner: this.address as any });
		return (resp as any).Data ?? [];
	}
}

export const galaWallet = new GalaWallet();