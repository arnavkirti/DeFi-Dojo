'use client';
import { useState } from 'react';
import { WalletDefault } from '@coinbase/onchainkit/wallet';

const tokens = [
  { name: 'Ethereum', symbol: 'ETH', apy: '5.2%', balance: '2.5 ETH' },
  { name: 'Bitcoin', symbol: 'BTC', apy: '3.8%', balance: '0.8 BTC' },
  { name: 'Solana', symbol: 'SOL', apy: '7.1%', balance: '50 SOL' },
];

const address = ""

export default function StakeTokens() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [stakeAmount, setStakeAmount] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: "column",justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ width: '350px', padding: '20px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <WalletDefault/>
        <h2 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Stake Tokens</h2>

        <div>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Stake Amount:</label>
          <input 
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            type="number"
            placeholder="0.0"
          />
        </div>
        
        <div style={{ marginTop: '10px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Select Token:</label>
          <select 
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            onChange={(e) => setSelectedToken(tokens.find(t => t.symbol === e.target.value))}
          >
            {tokens.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.name} ({token.apy} APY)
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500', color: '#4a5568', marginTop: '10px' }}>
          Balance: {selectedToken.balance}
        </div>
        
        <button 
          style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', fontSize: '16px', padding: '10px', borderRadius: '5px', marginTop: '15px', border: 'none', cursor: 'pointer' }}
        >
          Stake Tokens
        </button>
      </div>
      <div className="max-w-sm mx-auto bg-gradient-to-r from-blue-800 to-purple-600 text-white p-6 rounded-2xl shadow-lg text-center">
  <h2 className="text-lg font-semibold mb-4">Your Staking Details</h2>

  <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-3">
    <p className="text-sm">Staked Amount</p>
    <p className="text-2xl font-bold">1.5 ETH</p>
  </div>

  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
    <p className="text-sm">Current Value</p>
    <p className="text-2xl font-bold">$3,600</p>
  </div>
</div>
    </div>
  );
}
