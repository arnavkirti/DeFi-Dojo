"use client";
import { useState, useEffect } from "react";
// import { WalletDefault } from "@coinbase/onchainkit/wallet";
import { useAccount, useBalance } from "wagmi";
// import { FundCard } from "@coinbase/onchainkit/fund";
import dojoAbi from "@/abi/dojoAbi.json";
import yieldFarming from "@/abi/yieldFarming.json";
import { ethers } from "ethers";
import { FaEthereum } from "react-icons/fa";
import { useRouter } from "next/navigation";
const tokens = [
  { name: "Ethereum", symbol: "ETH", apy: "13.12%", balance: "2.5 ETH" },
];
const dojoAddress = "00xF302681e2172A96A81A3926608C1CDCA0ffa876c";
const yieldFarmingAddress = "0x797ACB97aa4B23698c4fcAA9E203A23421050F62";

export default function StakeTokens() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [stakeAmount, setStakeAmount] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [dojoContract, setDojoContract] = useState<any>();
  const [yieldFarmingContract, setYieldFarmingContract] = useState<any>();
  const [balance, setBalance] = useState<any>();
  const [ethBalance, setEthBalance] = useState<any>();
  const [userBlance, setUserBalance] = useState<any>(); // Random between 12-14s
  const [timeLeft, setTimeLeft] = useState<any>();
  const router = useRouter();
  const [signer, setSigner] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);

  function startTimer() {
    const randomTime = Math.floor(Math.random() * 2); // Random between 12-14s
    const getRandomTime = () => 12 + randomTime; // Random between 12-14s
    let timeLeft = getRandomTime();
    setTimeLeft(timeLeft.toFixed(1));
    console.log(`Timer started: ${timeLeft.toFixed(1)} seconds`);

    const timer = setInterval(() => {
      timeLeft -= 0.1;

      // Log time at every 0.1s
      setTimeLeft(timeLeft.toFixed(1));

      if (timeLeft <= 0) {
        console.log("Timer Resetting...");
        timeLeft = getRandomTime(); // Reset timer with new random value
      }
    }, 100);
  }

  // Function to get random time between 12 and 14 seconds

  useEffect(() => {
    async function setupProvider() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" }); // Request user permission
        const signer = provider.getSigner();
        const dojoContract = new ethers.Contract(dojoAddress, dojoAbi, signer);
        setDojoContract(dojoContract);
        const yieldFarmingContract = new ethers.Contract(
          yieldFarmingAddress,
          yieldFarming,
          signer
        );
        setYieldFarmingContract(yieldFarmingContract);
        const address = await signer.getAddress();
        const balanceWei = await signer.getBalance();
        const balanceEth = ethers.utils.formatEther(balanceWei); // Convert from Wei to ETH
        setUserBalance(balanceEth);
        setSigner(signer);
        setAddress(address);
        startTimer();
      } else {
        console.log("No Ethereum provider found");
      }
    }
    setupProvider();
  }, []);

  const staketokens = async () => {
    try {
      if (!signer) {
        console.log("Wallet not connected");
        return;
      }
      console.log(stakeAmount);

      const tx = await yieldFarmingContract.depositEth({
        value: ethers.utils.parseEther(stakeAmount),
      });

      console.log("Transaction Hash:", tx.hash);
      await tx.wait(); // Wait for transaction confirmation
      console.log("Transaction Confirmed");
    } catch (error) {
      console.error("Error staking tokens:", error);
    }
  };

  const getbalance = async () => {
    try {
      const response = await yieldFarmingContract.getUserDojoCoinBalance(
        address
      );
      const balance = await yieldFarmingContract.getUserSepoliaEthBalance(
        address
      );
      setEthBalance(Number(ethers.BigNumber.from(balance._hex)) / 1e18);
      setBalance(Number(ethers.BigNumber.from(response._hex)) / 1e18);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  const startYearFarmer = async () => {
    try {
      const response = await yieldFarmingContract.startYearFarmer();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const startDayFarmer = async () => {
    try {
      const response = await yieldFarmingContract.startDayFarmer();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const startMonthFarmer = async () => {
    try {
      const response = await yieldFarmingContract.startMonthFarmer();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const claimReward = async () => {
    try {
      const response = await yieldFarmingContract.claimRewards();
      const repsonse2 = await yieldFarmingContract.stopFarming();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div
          style={{
            width: "350px",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Stake Tokens
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stake Amount:
            </label>
            <input
              type="number"
              placeholder="0.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               placeholder-gray-400 text-gray-700 bg-white
               transition-all duration-200"
              onChange={(e) => setStakeAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Token:
            </label>
            <select
              onChange={(e) => {
                const selected = tokens.find(
                  (t) => t.symbol === e.target.value
                );
                setSelectedToken(selected || tokens[0]); // Set to the first token if not found
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               text-gray-700 bg-white appearance-none
               transition-all duration-200 bg-clip-padding"
            >
              {tokens.map((token) => (
                <option
                  key={token.symbol}
                  value={token.symbol}
                  className="text-gray-700 hover:bg-blue-50"
                >
                  {token.name} ({token.apy} APY)
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "500",
              color: "#4a5568",
              marginTop: "10px",
            }}
          >
            Balance: {userBlance}
          </div>

          <button
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "16px",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "15px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => staketokens()}
          >
            Stake Tokens
          </button>
        </div>
        <div className="w-4/5 mx-auto bg-gradient-to-r from-blue-800 to-purple-600 text-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-xl font-bold mb-6">Your Staking Details</h2>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={startDayFarmer}
              className="bg-white text-blue-800 px-5 py-2 rounded-lg font-medium shadow-md hover:bg-gray-200 transition"
            >
              Start Day
            </button>
            <button
              onClick={startMonthFarmer}
              className="bg-white text-blue-800 px-5 py-2 rounded-lg font-medium shadow-md hover:bg-gray-200 transition"
            >
              Start Month
            </button>
            <button
              onClick={startYearFarmer}
              className="bg-white text-blue-800 px-5 py-2 rounded-lg font-medium shadow-md hover:bg-gray-200 transition"
            >
              Start Year
            </button>
            <button
              onClick={getbalance}
              className="bg-white text-blue-800 px-5 py-2 rounded-lg font-medium shadow-md hover:bg-gray-200 transition"
            >
              Get Balance
            </button>
            <button
              onClick={claimReward}
              className="bg-red-500 text-blue-800 px-5 py-2 rounded-lg font-medium shadow-md hover:bg-gray-200 transition"
            >
              Claim Reward
            </button>
            <button
              onClick={() => {
                router.push("/tutorial/2");
              }}
            >
              Visualize Performance in Simulation
            </button>
          </div>

          <div className="bg-white bg-opacity-20 p-5 rounded-lg flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaEthereum className="text-2xl text-yellow-400" />
              <p className="text-lg font-medium">Staked Amount</p>
            </div>
            <p className="text-2xl font-bold">{ethBalance} ETH</p>
          </div>

          <div className="bg-white bg-opacity-20 p-5 rounded-lg flex justify-between items-center">
            <p className="text-lg font-medium">Current Value</p>
            <p className="text-2xl font-bold">${balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
