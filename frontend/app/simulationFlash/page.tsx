"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./LoanAnimation.module.css";
import dojoAbi from "@/abi/dojoAbi.json";
import { ethers } from "ethers";

const dojoAddress = "0xF302681e2172A96A81A3926608C1CDCA0ffa876c"; // Fixed typo in address

const LoanAnimation = () => {
  const [step, setStep] = useState(0);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [loanAmount, setLoanAmount] = useState(1); // $1 loan
  const [profit, setProfit] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    async function setupProvider() {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" }); // Request user permission
          const signer = await provider.getSigner();
          const dojoContract = new ethers.Contract(
            dojoAddress,
            dojoAbi,
            signer
          );
          setContract(dojoContract);
          const userAddress = await signer.getAddress();
          setAddress(userAddress);
          const balanceWei = await provider.getBalance(userAddress);
          const balance = ethers.utils.formatEther(balanceWei);
          console.log(`Balance: ${balance} ETH`);
          startTimer();
        } catch (error) {
          console.error("Error setting up Ethereum provider:", error);
        }
      } else {
        console.log("No Ethereum provider found");
      }
    }
    setupProvider();
  }, []);

  const startTimer = () => {
    const randomTime = Math.floor(Math.random() * 2); // Random between 12-14s
    const getRandomTime = () => 12 + randomTime;
    let timeLeftValue = getRandomTime();
    setTimeLeft(timeLeftValue.toFixed(1));

    const timer = setInterval(() => {
      timeLeftValue -= 0.1;

      if (timeLeftValue <= 0) {
        clearInterval(timer);
        if (step < 6) {
          alert("You failed to complete the transaction within one block!");
          setFailed(true);
          setIsAnimating(false);
        }
        resetAnimation(); // Restart the animation and timer
      } else {
        setTimeLeft(timeLeftValue.toFixed(1));
      }
    }, 100);
  };

  const steps = [
    `Request ${loanAmount} Loan`,
    `Receive ${loanAmount} from Pool`,
    `Buy Token on DEX A (${loanAmount})`,
    "Receive Token from DEX A",
    `Sell Token on DEX B (${loanAmount * 1.2})`,
    `Receive ${loanAmount * 1.2} from DEX B`,
    `Repay ${loanAmount} to Pool`,
    `Keep Profit: ${profit.toFixed(2)}`,
  ];

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (isAnimating && step < steps.length - 1) {
      const timeoutId = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isAnimating, step, steps.length]);

  useEffect(() => {
    if (step === 7) {
      setProfit(loanAmount * 0.2);
      finalThing();
    }
  }, [step]);

  const finalThing = async () => {
    try {
      if (contract) {
        const response = await contract.mint(
          address,
          ethers.utils.parseEther((loanAmount * 0.2).toString())
        );
        console.log("Mint Response:", response);
      }
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  const resetAnimation = () => {
    setStep(0);
    setIsAnimating(false);
    setFailed(false);
    startTimer(); // Start the timer again
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center my-10">
      <div>
        <p className="text-white" style={{ marginTop: "90px" }}>
          {steps[step]}
        </p>
        {timeLeft && (
          <h1 style={{ marginTop: "100px" }}>Time Left: {timeLeft} seconds</h1>
        )}
      </div>
      <div className={styles.container}>
        {/* User */}
        <div
          className={`${styles.node} ${styles.user} ${
            step >= 0 ? styles.active : ""
          }`}
        >
          <div className={styles.label}>User</div>
          {step >= 5 && (
            <div className={styles.amount}>
              +${(loanAmount * 1.2).toFixed(2)}
            </div>
          )}
          {step === 7 && (
            <div className={styles.profit}>+${profit.toFixed(2)}</div>
          )}
          {step >= 3 && step < 5 && (
            <div className={styles.token}>${loanAmount} Token</div>
          )}
        </div>
        {/* Liquidity Pool */}
        <div
          className={`${styles.node} ${styles.pool} ${
            step >= 0 ? styles.active : ""
          }`}
        >
          <div className={styles.label}>Liquidity Pool</div>
          <div className={styles.balance}>$1000 TVL</div>
          {step >= 1 && <div className={styles.amount}>-${loanAmount}</div>}
          {step >= 6 && <div className={styles.amount}>+${loanAmount}</div>}
        </div>
        {/* DEX A */}
        <div
          className={`${styles.node} ${styles.dex} ${styles.dex1} ${
            step >= 2 ? styles.active : ""
          }`}
        >
          <div className={styles.label}>DEX A</div>
          <div className={styles.pair}>DOJO/USD</div>
          <div className={styles.price}>$1.00</div>
          {step >= 2 && <div className={styles.amount}>+${loanAmount}</div>}
        </div>
        {/* DEX B */}
        <div
          className={`${styles.node} ${styles.dex} ${styles.dex2} ${
            step >= 4 ? styles.active : ""
          }`}
        >
          <div className={styles.label}>DEX B</div>
          <div className={styles.pair}>DOJO/USDC</div>
          <div className={styles.price}>$1.20</div>
          {step >= 4 && <div className={styles.amount}>-${loanAmount}</div>}
        </div>
        {/* Arrows */}
        <svg className={styles.arrows}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path className={styles.arrowhead} d="M0 0L10 5L0 10z" />
            </marker>
          </defs>
          {/* User -> Pool (Request) */}
          <path
            className={`${styles.arrow} ${step >= 0 ? styles.active : ""}`}
            d="M150,400 Q300,200 350,150"
          />
          {/* Pool -> User (Loan) */}
          <path
            className={`${styles.arrow} ${step >= 1 ? styles.active : ""}`}
            d="M350,150 Q300,250 150,400"
          />
          {/* User -> DEX A (Buy) */}
          <path
            className={`${styles.arrow} ${step >= 2 ? styles.active : ""}`}
            d="M150,400 Q250,300 500,250"
          />
          {/* DEX A -> User (Token) */}
          <path
            className={`${styles.arrow} ${styles.tokenArrow} ${
              step >= 3 ? styles.active : ""
            }`}
            d="M500,250 Q300,350 150,400"
          />
          {/* User -> DEX B (Sell) */}
          <path
            className={`${styles.arrow} ${step >= 4 ? styles.active : ""}`}
            d="M150,400 Q250,300 650,250"
          />
          {/* DEX B -> User (Money) */}
          <path
            className={`${styles.arrow} ${step >= 5 ? styles.active : ""}`}
            d="M650,250 Q400,350 150,400"
          />
          {/* User -> Pool (Repay) */}
          <path
            className={`${styles.arrow} ${step >= 6 ? styles.active : ""}`}
            d="M150,400 Q250,200 350,150"
          />
        </svg>
      </div>
      <button
        className={styles.startButton}
        onClick={startAnimation}
        disabled={isAnimating || failed}
      >
        {isAnimating ? "Running..." : "Start Animation"}
      </button>
      <button className={styles.resetButton} onClick={resetAnimation}>
        Restart
      </button>
      <input
        type="number"
        value={Math.min(Math.max(loanAmount, 1), 1000)}
        onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
        className="w-full max-w-xs p-2.5 my-4 text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 hover:border-gray-500 transition-colors"
        placeholder="Enter loan amount"
      />
    </div>
  );
};

export default LoanAnimation;
