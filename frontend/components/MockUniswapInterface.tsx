import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { ethers } from "ethers";
import yieldFarming from "@/abi/yieldFarming.json";

interface MockUniswapInterfaceProps {
  onTaskProgress: (taskType: string) => void;
  tutorial: any;
  level: number;
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

  const handleSwap = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Define the contract address and ABI
    const contractAddress = "0x797ACB97aa4B23698c4fcAA9E203A23421050F62"; // Replace with your contract address
    const contractABI = yieldFarming;

    // Create a contract instance
    const yieldFarmingContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    try {
      if (!signer) {
        console.log("Wallet not connected");
        return;
      }
      console.log(amount);

      const tx = await yieldFarmingContract.depositEth({
        value: ethers.utils.parseEther(amount),
      });

      console.log("Transaction Hash:", tx.hash);
      await tx.wait(); // Wait for transaction confirmation
      console.log("Transaction Confirmed");
    } catch (error) {
      console.error("Error staking tokens:", error);
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
        onClick={handleSwap}
      >
        Swap
      </Button>
    </div>
  );
}
