import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";

interface MockUniswapInterfaceProps {
  onTaskProgress: (taskType: string) => void;
  tutorial: any;
}

export default function MockUniswapInterface({
  onTaskProgress,
  tutorial,
}: MockUniswapInterfaceProps) {
  const { login, authenticated } = usePrivy();
  const [selectedTokens, setSelectedTokens] = useState({ from: "", to: "" });
  const [amount, setAmount] = useState("");

  // When wallet connects
  const handleConnect = async () => {
    if (!authenticated) {
      await login();
      onTaskProgress("CONNECT_WALLET");
    }
  };

  // When tokens are selected
  const handleTokenSelection = (from: string, to: string) => {
    setSelectedTokens({ from, to });
    if (from === "ETH" && to === "USDC") {
      onTaskProgress("SELECT_TOKENS");
    }
  };

  // When amount is entered and review is shown
  const handleAmountInput = (value: string) => {
    setAmount(value);
    if (value && selectedTokens.from && selectedTokens.to) {
      onTaskProgress("REVIEW_SWAP");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Swap Tokens</h2>

      {/* Connect Wallet Button */}
      <Button
        onClick={handleConnect}
        className="w-full"
        disabled={authenticated}
      >
        {authenticated ? "Wallet Connected" : "Connect Wallet"}
      </Button>

      {/* Token Selection */}
      <div className="space-y-2">
        <select
          className="w-full p-2 rounded bg-muted/20 border border-primary/20"
          value={selectedTokens.from}
          onChange={(e) =>
            handleTokenSelection(e.target.value, selectedTokens.to)
          }
        >
          <option value="">Select token</option>
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
        </select>

        <select
          className="w-full p-2 rounded bg-muted/20 border border-primary/20"
          value={selectedTokens.to}
          onChange={(e) =>
            handleTokenSelection(selectedTokens.from, e.target.value)
          }
        >
          <option value="">Select token</option>
          <option value="ETH">ETH</option>
          <option value="USDC">USDC</option>
        </select>
      </div>

      {/* Amount Input */}
      <input
        type="number"
        placeholder="Enter amount"
        className="w-full p-2 rounded bg-muted/20 border border-primary/20"
        value={amount}
        onChange={(e) => handleAmountInput(e.target.value)}
      />

      {/* Swap Button */}
      <Button
        className="w-full"
        disabled={!amount || !selectedTokens.from || !selectedTokens.to}
      >
        Swap
      </Button>
    </div>
  );
}
