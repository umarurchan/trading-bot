import { useState } from 'react';
import { Settings, Target, BarChart3, TrendingUp, Play, CheckCircle } from 'lucide-react';

const TradingBot = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('arbitrage');
  const [tradingAmount, setTradingAmount] = useState(50);
  const [isConnected] = useState(true);

  const strategies = [
    {
      id: 'arbitrage',
      name: 'Arbitrage',
      subtitle: 'High Profit',
      icon: '⚡',
      color: 'bg-green-100 border-green-300'
    },
    {
      id: 'market-making',
      name: 'Market Making',
      subtitle: 'Steady Income',
      icon: '📊',
      color: 'bg-gray-100 border-gray-300'
    },
    {
      id: 'trend-follow',
      name: 'Trend Follow',
      subtitle: 'Long Term',
      icon: '📈',
      color: 'bg-gray-100 border-gray-300'
    }
  ];

  const portfolioTokens = [
    { symbol: 'GALA', balance: '0.00', value: '$0.00', icon: '⚫' },
    { symbol: 'MUSIC', balance: '0.00', value: '$0.00', icon: '🎵' },
    { symbol: 'GUSDC', balance: '0.00', value: '$0.00', icon: '💰' },
    { symbol: 'TOWN', balance: '0.00', value: '$0.00', icon: '🏘️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🧁</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">GalaSwap Trading Bot</h1>
              <p className="text-gray-600">Your cute companion for profitable crypto trading! 💎</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isConnected && (
              <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg border border-green-300">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">MetaMask</span>
                <span className="text-xs text-green-600">0x886e...bda9</span>
              </div>
            )}
            <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
              Disconnect
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" aria-label="Settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8">
            {/* Bot Status */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-lg font-medium text-gray-700">😴 Bot is Sleeping</span>
                </div>
                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium">
                  <Play className="w-4 h-4" />
                  Start Trading
                </button>
              </div>
            </div>

            {/* Trading Strategy */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Trading Strategy</h3>
                </div>
                <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg">Configure</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {strategies.map((strategy) => (
                  <button
                    key={strategy.id}
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      selectedStrategy === strategy.id
                        ? 'bg-green-100 border-green-300 shadow-md'
                        : strategy.color
                    }`}
                    aria-pressed={selectedStrategy === strategy.id}
                  >
                    <div className="text-2xl mb-2">{strategy.icon}</div>
                    <div className="font-semibold text-gray-800">{strategy.name}</div>
                    <div className="text-sm text-gray-600">{strategy.subtitle}</div>
                  </button>
                ))}
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Selected:</strong> Arbitrage Trading - Exploits price differences between tokens
                </p>
              </div>
            </div>

            {/* Set Trading Amount */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">💰</span>
                <h3 className="text-lg font-semibold text-gray-800">Set Trading Amount</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Token to Trade</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                    <option>💰 GUSDC (0.00)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount per Trade</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={tradingAmount}
                      onChange={(e) => setTradingAmount(Number(e.target.value))}
                      className="flex-1 p-3 border border-gray-300 rounded-lg"
                    />
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">10%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                {[5, 10, 25, 50].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTradingAmount(amount)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                      tradingAmount === amount
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>💼 Trading with: 50 GUSDC per trade</div>
                  <div>📊 Estimated USD: $50.00</div>
                  <div>💰 Live Price: GUSDC = $1.0000</div>
                </div>
              </div>
            </div>

            {/* Profit Guarantee */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-yellow-600 mt-1">⚠️</div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">💰 Profit Guarantee</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Only executes trades with guaranteed profits (2%+ minimum)</li>
                    <li>• Scans 8+ tokens for arbitrage opportunities every 30 seconds</li>
                    <li>• 100% success rate - never makes losing trades</li>
                    <li>• All trades are risk-free with built-in profit protection 🛡️</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600">Total Trades</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">0</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Success Rate</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-5 h-5 text-green-500 text-lg">0</span>
                  <span className="text-sm text-gray-600">Daily Trades</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">0/5</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Net Profit</span>
                </div>
                <div className="text-2xl font-bold text-green-600">+0.00 GALA</div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💼</span>
                  <h3 className="font-semibold text-gray-800">Your Portfolio</h3>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600" aria-label="Refresh">🔄</button>
                  <button className="p-1 text-gray-400 hover:text-gray-600" aria-label="Clock">🕐</button>
                  <button className="p-1 text-gray-400 hover:text-gray-600" aria-label="Target">🟢</button>
                </div>
              </div>
              
              <div className="space-y-3">
                {portfolioTokens.map((token) => (
                  <div key={token.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{token.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800">{token.symbol}</div>
                        <div className="text-sm text-gray-500">{token.balance}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">{token.balance}</div>
                      <div className="text-sm text-gray-500">{token.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Portfolio Value</span>
                  <span className="font-bold text-green-600">$0.00</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">Today's Profit</span>
                  <span className="font-bold text-green-600">+$0.00</span>
                </div>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  <h3 className="font-semibold text-gray-800">Recent Trades</h3>
                </div>
                <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm">View All</button>
              </div>
              
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🕐</div>
                <p className="text-gray-500 mb-2">No trades yet</p>
                <p className="text-sm text-gray-400">Start trading to see your history here!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingBot;

