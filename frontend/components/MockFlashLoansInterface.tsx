import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, AlertTriangle } from "lucide-react";
import { getTokenPrice } from "@/utils/getPriceByPlatform";

interface MockFlashLoansInterfaceProps {
  onTaskProgress: (taskType: string) => void;
  level: number;
  onLevelComplete?: () => void;
  currentTasks: { type: string; completed: boolean }[];
}

export default function MockFlashLoansInterface({
  onTaskProgress,
  level,
  onLevelComplete,
  currentTasks,
}: MockFlashLoansInterfaceProps) {
  const { login, authenticated } = usePrivy();
  const [priceData, setPriceData] = useState<{ [key: string]: number }>({});
  const [selectedDEXs, setSelectedDEXs] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [liquidationTarget, setLiquidationTarget] = useState("");
  const [liquidationAmount, setLiquidationAmount] = useState("");
  const [collateralRatio, setCollateralRatio] = useState<number | null>(null);
  const [interestRates, setInterestRates] = useState<{ [key: string]: number }>({});
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [step, setStep] = useState(0);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [currentPriceCurrency, setCurrentPriceCurrency] = useState("ETH");
  const [platform, setPlatform] = useState("Uniswap");
  const [platformPriceData, setPlatformPriceData] = useState<number | null>(null);
  const [secondPlatform, setSecondPlatform] = useState("Uniswap");
  const [secondPlatformPriceData, setSecondPlatformPriceData] = useState<number | null>(null);

  useEffect(() => {
    // Reset all states when level changes
    setPriceData({});
    setSelectedDEXs([]);
    setSimulationResult(null);
    setShowSuccess(false);
    setLiquidationTarget("");
    setLiquidationAmount("");
    setCollateralRatio(null);
    setInterestRates({});
    setIsLevelComplete(false);
    setStep(0);
    setHasExecuted(false);
  }, [level]);

  const checkLevelCompletion = () => {
    const allTasksCompleted = currentTasks.every((task) => task.completed);
    if (allTasksCompleted) {
      setShowSuccess(true);
    }
    return allTasksCompleted;
  };

  // Level 1: Arbitrage Interface
  const ArbitrageInterface = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Arbitrage Opportunity Scanner
      </h3>

      <motion.div
        className="p-4 border border-primary/20 rounded-lg bg-black/40 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
      >
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          onClick={() => {
           
            setPriceData({
              'Uniswap': 1850.45,
              'Sushiswap': 1852.30,
              'Curve': 1849.80
            });

            setStep(1);
          }}
          disabled={step >= 1}
        >
          Analyze Price Variations
        </Button>

        {Object.keys(priceData).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 space-y-2"
          >
            <select
              value={currentPriceCurrency}
              onChange={(e) => setCurrentPriceCurrency(e.target.value)}
              className="w-full p-2 rounded-lg bg-black/40 border border-primary/20 mb-2 text-white/90 
                backdrop-blur-sm hover:border-primary/40 focus:border-primary/60 focus:ring-2 
                focus:ring-primary/20 focus:outline-none transition-all duration-200 
                cursor-pointer appearance-none custom-select"
            >
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
              <option value="DAI">DAI</option>
              <option value="BTC">BTC</option>
              <option value="AVAX">AVAX</option>
              <option value="MATIC">MATIC</option>
              <option value="LINK">LINK</option>
              <option value="UNI">UNI</option>
            </select>
            <h4 className="font-semibold text-purple-300">Current Prices ({currentPriceCurrency}/USD):</h4>

            <div  className="flex justify-between">
                <select value={platform} onChange={async(e) => {
                    setPlatform(e.target.value as "uniswap" | "sushiswap" | "binance");
                    setPlatformPriceData(await getTokenPrice(e.target.value as "uniswap" | "sushiswap" | "binance", currentPriceCurrency));
                }} className="p-2 rounded-lg bg-black/40 border border-primary/20 mb-2 text-white/90 
                backdrop-blur-sm hover:border-primary/40 focus:border-primary/60 focus:ring-2 
                focus:ring-primary/20 focus:outline-none transition-all duration-200 
                cursor-pointer appearance-none custom-select">
                    <option value="uniswap">Uniswap</option>
                    <option value="sushiswap">Sushiswap</option>
                    <option value="binance">Binance</option>
                </select>
                <span className="text-green-400 mt-2">${platformPriceData}</span>
              </div>
              <div className="flex justify-between">
                <select value={secondPlatform} onChange={async(e) => {
                    setSecondPlatform(e.target.value as "uniswap" | "sushiswap" | "binance");
                    setSecondPlatformPriceData(await getTokenPrice(e.target.value as "uniswap" | "sushiswap" | "binance", currentPriceCurrency));
                }} className="p-2 rounded-lg bg-black/40 border border-primary/20 mb-2 text-white/90 
                backdrop-blur-sm hover:border-primary/40 focus:border-primary/60 focus:ring-2 
                focus:ring-primary/20 focus:outline-none transition-all duration-200 
                cursor-pointer appearance-none custom-select">
                    <option value="uniswap">Uniswap</option>
                    <option value="sushiswap">Sushiswap</option>
                    <option value="binance">Binance</option>
                </select>
                <span className="text-green-400 mt-2">${secondPlatformPriceData}</span>
              </div>

            
          </motion.div>
        )}
        {step>=1 &&(
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          onClick={() => {
           
            onTaskProgress("STUDY_PRICE_VARIATIONS");
            

            setStep(2);
          }}
          disabled={step >= 2}
        >
         Done Analyzing Price Variations
        </Button>
        )}

      </motion.div>

      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-primary/20 rounded-lg bg-black/40"
        >
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-blue-500"
            onClick={() => {
              onTaskProgress("SIMULATE_ARBITRAGE_TRADE");
              setSimulationResult(0.32);
              setStep(3);
            }}
            disabled={step > 2}
          >
            Simulate Arbitrage Trade
          </Button>

          {simulationResult !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <h4 className="font-semibold text-green-300">Simulation Results:</h4>
              <p>Potential Profit: {simulationResult} ETH</p>
              <p>Gas Cost: ~0.05 ETH</p>
              <p>Net Profit: {(simulationResult - 0.05).toFixed(2)} ETH</p>
            </motion.div>
          )}
        </motion.div>
      )}
      {step>=3 &&(
        <Button
        className="w-full bg-gradient-to-r from-green-500 to-blue-500"
        onClick={() => {
          onTaskProgress("CALCULATE_NET_PROFIT");
          setStep(4);
      
        }}
        disabled={step > 3}
      >
        Calculated Net Profit
      </Button>
      )}

      {step >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-primary/20 rounded-lg bg-black/40"
        >
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
            onClick={() => {
              onTaskProgress("EXECUTE_ARBITRAGE");
              setHasExecuted(true);
              if (checkLevelCompletion()) {
                onLevelComplete?.();
              }
            }}
            disabled={hasExecuted}
          >
            Execute Arbitrage Trade
          </Button>
          
          {hasExecuted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-400 text-center"
            >
              Arbitrage trade executed successfully! 🎉
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  // Level 2: Liquidation Interface
  const LiquidationInterface = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
        Liquidation Opportunity Scanner
      </h3>

      <motion.div
        className="p-4 border border-primary/20 rounded-lg bg-black/40 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="text"
          placeholder="Enter position address"
          className="w-full p-2 rounded bg-muted/20 border border-primary/20 mb-2"
          value={liquidationTarget}
          onChange={(e) => {
            setLiquidationTarget(e.target.value);
            if (e.target.value) {
              onTaskProgress("IDENTIFY_LIQUIDATION_OPPORTUNITIES");
              setStep(2);
            }
          }}
        />

        {liquidationTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 space-y-2"
          >
            <h4 className="font-semibold text-orange-300">Position Details:</h4>
            <p>Collateral: 100 ETH</p>
            <p>Debt: 150,000 USDC</p>
            <p className="text-red-400">Health Factor: 1.02</p>
          </motion.div>
        )}
      </motion.div>

      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-primary/20 rounded-lg bg-black/40"
        >
          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-red-500"
            onClick={() => {
              onTaskProgress("ANALYZE_RISKY_POSITIONS");
              setCollateralRatio(0.95);
              setStep(3);
            }}
            disabled={step > 2}
          >
            Analyze Position Risk
          </Button>

          {collateralRatio !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <h4 className="font-semibold text-orange-300">Risk Analysis:</h4>
              <p>Collateral Ratio: {collateralRatio}</p>
              <p>Liquidation Price: $1,750</p>
              <p className="text-red-400">High Risk - Immediate Action Possible</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {step >= 3 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border border-primary/20 rounded-lg bg-black/40"
          >
            <Button
              className="w-full bg-gradient-to-r from-red-500 to-purple-500"
              onClick={() => {
                onTaskProgress("SIMULATE_LIQUIDATION");
                setStep(4);
              }}
              disabled={step > 3}
            >
              Simulate Liquidation
            </Button>
          </motion.div>

          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-primary/20 rounded-lg bg-black/40"
            >
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={() => {
                  onTaskProgress("EXECUTE_LIQUIDATION");
                  completeLevel();
                }}
                disabled={isLevelComplete}
              >
                Execute Liquidation
              </Button>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );

  // Level 3: Interest Rate Swap Interface
  const InterestRateSwapInterface = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
        Interest Rate Swap Scanner
      </h3>

      <motion.div
        className="p-4 border border-primary/20 rounded-lg bg-black/40 backdrop-blur-sm"
        whileHover={{ scale: 1.02 }}
      >
        <Button
          className="w-full bg-gradient-to-r from-green-500 to-blue-500"
          onClick={() => {
            setInterestRates({
              'Aave': 3.5,
              'Compound': 4.2,
              'dYdX': 3.8
            });
            onTaskProgress("RESEARCH_INTEREST_RATES");
            setStep(2);
          }}
          disabled={step > 1}
        >
          Research Interest Rates
        </Button>

        {Object.keys(interestRates).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 space-y-2"
          >
            <h4 className="font-semibold text-blue-300">Current Rates:</h4>
            {Object.entries(interestRates).map(([platform, rate]) => (
              <div key={platform} className="flex justify-between">
                <span>{platform}:</span>
                <span className="text-green-400">{rate}% APR</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-primary/20 rounded-lg bg-black/40"
        >
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
            onClick={() => {
              onTaskProgress("DEVELOP_SWAP_STRATEGY");
              setStep(3);
            }}
            disabled={step > 2}
          >
            Develop Swap Strategy
          </Button>

          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <h4 className="font-semibold text-purple-300">Strategy Details:</h4>
              <p>Borrow from: Aave (3.5% APR)</p>
              <p>Lend to: Compound (4.2% APR)</p>
              <p className="text-green-400">Potential Spread: 0.7%</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {step >= 3 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border border-primary/20 rounded-lg bg-black/40"
          >
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
              onClick={() => {
                onTaskProgress("SIMULATE_RATE_SWAP");
                setStep(4);
              }}
              disabled={step > 3}
            >
              Simulate Rate Swap
            </Button>
          </motion.div>

          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-primary/20 rounded-lg bg-black/40"
            >
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-red-500"
                onClick={() => {
                  onTaskProgress("EXECUTE_RATE_SWAP");
                  completeLevel();
                }}
                disabled={isLevelComplete}
              >
                Execute Rate Swap
              </Button>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );

  const completeLevel = () => {
    setIsLevelComplete(true);
    setShowSuccess(true);
    onLevelComplete?.();
  };

  const interfaces = [
    ArbitrageInterface,
    LiquidationInterface,
    InterestRateSwapInterface,
  ];

  const CurrentInterface = interfaces[level];

  return (
    <div className="relative p-6 border border-primary/20 rounded-lg bg-black/40 backdrop-blur-sm">
      <CurrentInterface />
      
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-primary/30 backdrop-blur-md"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2"
              >
                <Unlock className="w-8 h-8 text-green-400" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Level Complete! 🎉
              </h3>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-center text-5xl mb-4"
              >
                🌟
              </motion.div>
              
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => {
                  setShowSuccess(false);
                  onLevelComplete?.();
                }}
              >
                Continue to Next Level
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}