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
        
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}