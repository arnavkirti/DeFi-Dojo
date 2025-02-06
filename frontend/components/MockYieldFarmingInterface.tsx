import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MockYieldFarmingInterfaceProps {
  onTaskProgress: (taskType: string) => void;
  level: number;
}

export default function MockYieldFarmingInterface({
  onTaskProgress,
  level,
}: MockYieldFarmingInterfaceProps) {
  const { login, authenticated } = usePrivy();
  const [selectedPool, setSelectedPool] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [collateralAmount, setCollateralAmount] = useState("");
  const [lendingAmount, setLendingAmount] = useState("");
  const [stakingAmount, setStakingAmount] = useState("");
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Reset states when level changes
  useEffect(() => {
    setSelectedPool("");
    setDepositAmount("");
    setSelectedPlatform("");
    setCollateralAmount("");
    setLendingAmount("");
    setStakingAmount("");
    setIsMonitoring(false);
    setShowAnalytics(false);
  }, [level]);

  // Level 1: Liquidity Provider Interface
  const LiquidityProviderInterface = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Liquidity Pool Dashboard</h3>
      
      <Button
        onClick={() => {
          login();
          onTaskProgress("CONNECT_WALLET");
        }}
        disabled={authenticated}
        className="w-full"
      >
        {authenticated ? "Wallet Connected" : "Connect Wallet"}
      </Button>

      <div className="space-y-2">
        <select
          className="w-full p-2 rounded bg-muted/20 border border-primary/20"
          value={selectedPool}
          onChange={(e) => {
            setSelectedPool(e.target.value);
            if (e.target.value) onTaskProgress("DEPOSIT_LIQUIDITY");
          }}
        >
          <option value="">Select Pool</option>
          <option value="eth-usdc">ETH-USDC Pool (APY: 12%)</option>
          <option value="btc-eth">BTC-ETH Pool (APY: 15%)</option>
        </select>

        <input
          type="number"
          placeholder="Enter deposit amount"
          className="w-full p-2 rounded bg-muted/20 border border-primary/20"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={() => {
            setIsMonitoring(true);
            onTaskProgress("MONITOR_POOL");
          }}
          disabled={!selectedPool || !depositAmount}
        >
          Deposit and Monitor
        </Button>

        {isMonitoring && (
          <div className="p-4 border border-primary/20 rounded-lg bg-muted/10">
            <h4 className="font-medium mb-2">Pool Statistics</h4>
            <p>Your Share: {depositAmount || 0} tokens</p>
            <p>Earned Fees: 0.05 tokens</p>
            <p>Current APY: 12.5%</p>
          </div>
        )}
      </div>
    </div>
  );

  // Level 2: Borrowing Interface
  const BorrowingInterface = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Borrowing Dashboard</h3>
      
      <select
        className="w-full p-2 rounded bg-muted/20 border border-primary/20"
        value={selectedPlatform}
        onChange={(e) => {
          setSelectedPlatform(e.target.value);
          onTaskProgress("SELECT_PLATFORM");
        }}
      >
        <option value="">Select Lending Platform</option>
        <option value="aave">Aave</option>
        <option value="compound">Compound</option>
      </select>

      <input
        type="number"
        placeholder="Enter collateral amount"
        className="w-full p-2 rounded bg-muted/20 border border-primary/20"
        value={collateralAmount}
        onChange={(e) => {
          setCollateralAmount(e.target.value);
          if (e.target.value) onTaskProgress("DEPOSIT_COLLATERAL");
        }}
      />

      <Button
        className="w-full mt-2"
        onClick={() => onTaskProgress("REVIEW_LOAN_TERMS")}
        disabled={!selectedPlatform || !collateralAmount}
      >
        Review Loan Terms
      </Button>

      {selectedPlatform && collateralAmount && (
        <div className="p-4 border border-primary/20 rounded-lg bg-muted/10">
          <h4 className="font-medium mb-2">Loan Terms</h4>
          <p>Maximum LTV: 75%</p>
          <p>Interest Rate: 3.5% APR</p>
          <p>Liquidation Threshold: 82.5%</p>
        </div>
      )}
    </div>
  );

  // Level 3: Lending Interface
  const LendingInterface = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Lending Dashboard</h3>

      <input
        type="number"
        placeholder="Enter lending amount"
        className="w-full p-2 rounded bg-muted/20 border border-primary/20"
        value={lendingAmount}
        onChange={(e) => {
          setLendingAmount(e.target.value);
          if (e.target.value) onTaskProgress("PROVIDE_LENDING");
        }}
      />

      <Button
        className="w-full"
        onClick={() => onTaskProgress("REVIEW_INTEREST_RATES")}
        disabled={!lendingAmount}
      >
        Review Interest Rates
      </Button>

      {lendingAmount && (
        <div className="p-4 border border-primary/20 rounded-lg bg-muted/10">
          <h4 className="font-medium mb-2">Interest Rates</h4>
          <p>Supply APY: 4.2%</p>
          <p>Risk Level: Low</p>
          <p>Protocol Security Score: 95/100</p>
        </div>
      )}

      <Button
        className="w-full"
        onClick={() => onTaskProgress("SIMULATE_LENDING")}
        disabled={!lendingAmount}
      >
        Simulate Lending
      </Button>
    </div>
  );

  // Level 4: Staking Interface
  const StakingInterface = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Staking Dashboard</h3>

      <input
        type="number"
        placeholder="Enter staking amount"
        className="w-full p-2 rounded bg-muted/20 border border-primary/20"
        value={stakingAmount}
        onChange={(e) => {
          setStakingAmount(e.target.value);
          if (e.target.value) onTaskProgress("STAKE_TOKENS");
        }}
      />

      <Button
        className="w-full"
        onClick={() => onTaskProgress("REVIEW_STAKING_DETAILS")}
        disabled={!stakingAmount}
      >
        Review Staking Details
      </Button>

      {stakingAmount && (
        <div className="p-4 border border-primary/20 rounded-lg bg-muted/10">
          <h4 className="font-medium mb-2">Staking Details</h4>
          <p>Lock-up Period: 30 days</p>
          <p>Expected APY: 8.5%</p>
          <p>Early Withdrawal Fee: 2%</p>
        </div>
      )}

      <Button
        className="w-full"
        onClick={() => onTaskProgress("MONITOR_AND_CLAIM")}
        disabled={!stakingAmount}
      >
        Monitor & Claim Rewards
      </Button>
    </div>
  );

  // Level 5: Holding Interface
  const HoldingInterface = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Asset Management Dashboard</h3>

      <Button
        className="w-full"
        onClick={() => onTaskProgress("EVALUATE_HOLDING")}
      >
        Evaluate Holding Strategy
      </Button>

      <div className="p-4 border border-primary/20 rounded-lg bg-muted/10">
        <h4 className="font-medium mb-2">Strategy Comparison</h4>
        <p>Holding APY: 5.2%</p>
        <p>Active Trading Returns: 12.4%</p>
        <p>Risk Assessment: Medium</p>
      </div>

      <Button
        className="w-full"
        onClick={() => {
          setShowAnalytics(true);
          onTaskProgress("SETUP_TRACKING");
        }}
      >
        Setup Analytics Dashboard
      </Button>

      {showAnalytics && (
        <div className="p-4 border border-primary/20 rounded-lg bg-muted/10">
          <h4 className="font-medium mb-2">Historical Performance</h4>
          <p>30-Day Return: +3.2%</p>
          <p>90-Day Volatility: 12.5%</p>
          <p>Market Correlation: 0.85</p>
          <Button
            className="w-full mt-2"
            onClick={() => onTaskProgress("ANALYZE_TRENDS")}
          >
            Analyze Trends
          </Button>
        </div>
      )}
    </div>
  );

  const interfaces = [
    LiquidityProviderInterface,
    BorrowingInterface,
    LendingInterface,
    StakingInterface,
    HoldingInterface,
  ];

  const CurrentInterface = interfaces[level];

  return (
    <div className="p-4 border border-primary/20 rounded-lg bg-muted/5">
      <CurrentInterface />
    </div>
  );
}
