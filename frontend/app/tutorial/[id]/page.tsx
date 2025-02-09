"use client";

import React, { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle, Lock, Unlock } from "lucide-react";
import MockUniswapInterface from "@/components/MockUniswapInterface";
import axios from "axios";
import MockDaoInterface from "@/components/MockDaoInterface";
import MockYieldFarmingInterface from "@/components/MockYieldFarmingInterface";
import MockFlashLoansInterface from "@/components/MockFlashLoansInterface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tutorials = {
  1: {
    title: "Understanding Uniswap",
    description:
      "Learn the basics of Uniswap and how decentralized exchanges work.",
    content: `
      Welcome to your first lesson! Today we'll learn about Uniswap, one of the most popular
      decentralized exchanges in the DeFi ecosystem.

      Uniswap is an automated market maker (AMM) that allows users to trade tokens without
      the need for a traditional order book. Instead, it uses liquidity pools and a mathematical
      formula to determine prices.
    `,
    levels: [{
      title: "Level 1",
      description: "Learn the basics of Uniswap and how decentralized exchanges work.",
      tasks: [
        {
          text: "Connect your wallet to Uniswap",
        type: "CONNECT_WALLET",
        completed: false,
      },
      {
        text: "Select tokens for a swap (ETH to USDC)",
        type: "SELECT_TOKENS",
        completed: false,
      },
      {
        text: "Enter an amount and review the swap details",
        type: "REVIEW_SWAP",
        completed: false,
      },
    ],}],
    textForAI:
      "Explain how Uniswap's automated market maker (AMM) works, focusing on its liquidity pools, token swaps, and the concept of impermanent loss. Provide an in-depth example of a trade execution on Uniswap.",
  },
  3: {
    title: "Understanding Dao",
    description: "Learn the basics of DAOs and how they work.",
    content: `
      DAOs (Decentralized Autonomous Organizations) are innovative organizational structures
      that leverage blockchain technology to enable collective decision-making without centralized leadership.
      In a DAO, community members can propose, debate, and vote on decisions that affect the entire organization.
      This model promotes transparency, inclusivity, and community governance.
    `,
    levels: [{
      title: "Level 1",
      description: "",
      tasks: [
        {
          text: "Join a DAO community platform",
          type: "JOIN_DAO",
          completed: false,
        },
        {
          text: "Review recent DAO proposals",
          type: "REVIEW_PROPOSALS",
          completed: false,
        },
        {
          text: "Participate in a DAO vote",
          type: "VOTE_ON_PROPOSAL",
          completed: false,
        },
        {
          text: "Discuss DAO governance on the community forum",
          type: "DISCUSS_GOVERNANCE",
          completed: false,
        },
      ],
    }],
    
    textForAI:
      "Explain how Decentralized Autonomous Organizations (DAOs) work, focusing on the principles of decentralized governance, the proposal and voting mechanisms, token-based decision making, and how community consensus is achieved. Provide an in-depth example of how a proposal is submitted, debated, and executed within a DAO.",
  },
  2: {
    title: "Understanding Yield Farming",
    description: "Learn the basics of Yield Farming and how it works.",
    content: `
      Yield farming is a strategy in DeFi that involves staking or locking up digital assets in a smart contract to generate passive income.
      It typically involves providing liquidity to a decentralized exchange (DEX) or participating in a yield-generating protocol.
      The goal is to maximize returns by earning interest or rewards from the assets.
    `,
    levels: [
      {
        title: "Level 1: Liquidity Provider",
        description: "Learn the fundamentals of providing liquidity to a DeFi protocol.",
        tasks: [
          {
            text: "Connect your wallet to a liquidity pool platform",
            type: "CONNECT_WALLET",
            completed: false,
          },
          {
            text: "Deposit assets into a liquidity pool",
            type: "DEPOSIT_LIQUIDITY",
            completed: false,
          },
          {
            text: "Monitor your pool share and the fees you earn",
            type: "MONITOR_POOL",
            completed: false,
          },
        ],
      },
      {
        title: "Level 2: Borrowing",
        description: "Understand how to use your crypto as collateral to borrow assets.",
        tasks: [
          {
            text: "Select a DeFi lending platform",
            type: "SELECT_PLATFORM",
            completed: false,
          },
          {
            text: "Deposit collateral and simulate a borrowing transaction",
            type: "DEPOSIT_COLLATERAL",
            completed: false,
          },
          {
            text: "Review loan terms and risk factors",
            type: "REVIEW_LOAN_TERMS",
            completed: false,
          },
        ],
      },
      {
        title: "Level 3: Lending",
        description: "Explore how lending your crypto can generate passive income.",
        tasks: [
          {
            text: "Provide assets for lending on a chosen platform",
            type: "PROVIDE_LENDING",
            completed: false,
          },
          {
            text: "Review interest rates and understand lending risks",
            type: "REVIEW_INTEREST_RATES",
            completed: false,
          },
          {
            text: "Simulate a lending transaction and analyze potential returns",
            type: "SIMULATE_LENDING",
            completed: false,
          },
        ],
      },
      {
        title: "Level 4: Staking",
        description: "Learn how staking your tokens can yield additional rewards.",
        tasks: [
          {
            text: "Stake your tokens on a staking platform",
            type: "STAKE_TOKENS",
            completed: false,
          },
          {
            text: "Review staking rewards and understand lock-up periods",
            type: "REVIEW_STAKING_DETAILS",
            completed: false,
          },
          {
            text: "Monitor your staked tokens and claim rewards when available",
            type: "MONITOR_AND_CLAIM",
            completed: false,
          },
        ],
      },
      {
        title: "Level 5: Holding",
        description: "Understand the long-term strategy of holding assets for passive yield and risk management.",
        tasks: [
          {
            text: "Evaluate the benefits of holding versus active yield strategies",
            type: "EVALUATE_HOLDING",
            completed: false,
          },
          {
            text: "Set up a dashboard to track your asset performance over time",
            type: "SETUP_TRACKING",
            completed: false,
          },
          {
            text: "Analyze historical data and market trends for better decision-making",
            type: "ANALYZE_TRENDS",
            completed: false,
          },
        ],
      },
    ],
    textForAI: "Explain how yield farming works, focusing on the different types of yield farming strategies, the benefits of participating in yield farming, and the risks associated with it.",
  },
  4: {
    title: "Understanding Flash Loans",
    description: "Learn the basics of Flash Loans and how they work.",
    content: `
      Flash loans are a type of DeFi loan that allows users to borrow assets without collateral.
      They are typically used for arbitrage opportunities or to quickly respond to market conditions.
    `,
    levels: [
      {
        title: "Level 1: Arbitrage Opportunities",
        description: "Explore how to identify and execute arbitrage opportunities using flash loans. Learn to analyze multiple markets, detect pricing inefficiencies, and execute a series of trades that exploit these differences.",
        tasks: [
          {
            text: "Study the price variations across multiple decentralized exchanges (DEXs) to identify potential arbitrage opportunities. Use analytics tools and historical data to spot trends and determine when markets are misaligned.",
            type: "STUDY_PRICE_VARIATIONS",
            completed: false,
          },
          {
            text: "Set up a simulation environment to test arbitrage strategies. Create scenarios where you borrow funds via a flash loan and execute sequential trades across different DEXs to take advantage of price discrepancies.",
            type: "SIMULATE_ARBITRAGE_TRADE",
            completed: false,
          },
          {
            text: "Calculate the net profit of an arbitrage trade by considering gas fees, slippage, and other transaction costs. Develop a detailed spreadsheet or use a simulation tool to confirm that the profit margin is sufficient before execution.",
            type: "CALCULATE_NET_PROFIT",
            completed: false,
          },
          {
            text: "Execute a live arbitrage trade using a flash loan, ensuring you monitor the transaction in real time and adjust parameters dynamically to secure the profit.",
            type: "EXECUTE_ARBITRAGE",
            completed: false,
          },
        ],
      },
      {
        title: "Level 2: Flash Loan Liquidation Profits",
        description: "Learn how flash loans can be used to profit from liquidation events. Understand how to monitor vulnerable positions, analyze collateral ratios, and execute a liquidation strategy to secure discounted assets.",
        tasks: [
          {
            text: "Identify DeFi lending platforms that provide real-time data on positions nearing liquidation. Research the key indicators such as collateral-to-debt ratios and market volatility that signal a liquidation risk.",
            type: "IDENTIFY_LIQUIDATION_OPPORTUNITIES",
            completed: false,
          },
          {
            text: "Perform a detailed analysis of at-risk positions by calculating their collateral ratios. Use simulation tools to pinpoint the optimal moment when a flash loan can be used to trigger a liquidation event.",
            type: "ANALYZE_RISKY_POSITIONS",
            completed: false,
          },
          {
            text: "Simulate a flash loan liquidation scenario. Borrow funds via a flash loan to pay off the debt of a vulnerable position, claim the collateral at a discount, and document every step along with the expected profit margin.",
            type: "SIMULATE_LIQUIDATION",
            completed: false,
          },
          {
            text: "Execute a flash loan liquidation in a controlled environment. Initiate the loan, repay the target's debt, and secure the discounted collateral, while continuously monitoring market conditions to optimize profit.",
            type: "EXECUTE_LIQUIDATION",
            completed: false,
          },
        ],
      },
      {
        title: "Level 3: Interest Rate Swaps",
        description: "Discover how to leverage differences in interest rates using flash loans. This level covers researching interest rate disparities, strategizing a temporary swap, and executing a flash loan to benefit from the spread.",
        tasks: [
          {
            text: "Research and compare interest rates across multiple DeFi lending and borrowing platforms. Identify instances where the borrowing rate on one platform is significantly lower than the lending rate on another.",
            type: "RESEARCH_INTEREST_RATES",
            completed: false,
          },
          {
            text: "Develop a comprehensive strategy to utilize flash loans for interest rate swaps. Outline the steps for borrowing at a lower rate, repaying at a higher rate, and ensuring the spread generates a net profit.",
            type: "DEVELOP_SWAP_STRATEGY",
            completed: false,
          },
          {
            text: "Simulate an interest rate swap transaction. Model various market conditions including fluctuating rates, transaction fees, and flash loan durations to evaluate the effectiveness of your strategy.",
            type: "SIMULATE_RATE_SWAP",
            completed: false,
          },
          {
            text: "Execute the interest rate swap using a flash loan. Monitor the transaction closely, adjust parameters as needed during execution, and verify that the swap reduces costs or yields the anticipated profit.",
            type: "EXECUTE_RATE_SWAP",
            completed: false,
          },
        ],
      },
    ],
    textForAI: "Explain how flash loans work, focusing on the different types of flash loans, the benefits of participating in flash loans, and the risks associated with it.",
  },
  
  
  
};

// Add these new types
// Add these new types
type Message = {
  content: string;
  role: "user" | "assistant";
};

export default function TutorialPage({ params }: { params: { id: string } }) {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const tutorial = tutorials[Number(params.id) as keyof typeof tutorials];
  console.log("tutorial", tutorial);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNFTMinted, setIsNFTMinted] = useState(false);
  const [tasks, setTasks] = useState(
    tutorial?.levels.map((level) => level.tasks.map((task) => ({ ...task, completed: false }))) || []
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tutorialContent, setTutorialContent] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([0]);

  React.useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  React.useEffect(() => {
    if (authenticated) {
      setTasks((prev) =>
        prev.map((levelTasks) =>
          levelTasks.map((task) =>
            task.type === "CONNECT_WALLET" ? { ...task, completed: true } : task
          )
        )
      );
    }
  }, [authenticated]);

  // Add this effect to fetch tutorial content on mount
  React.useEffect(() => {
    const fetchTutorialContent = async () => {
      try {
        const response = await axios.post(
          "https://autonome.alt.technology/agent-cwvvsu/chat",
          {
            message:`${tutorial.textForAI}`,
          },
          {
            auth: {
              username: process.env.NEXT_PUBLIC_AI_AGENT_USERNAME!,
              password: process.env.NEXT_PUBLIC_AI_AGENT_PASSWORD!,
            },
          }
        );

        setTutorialContent(response.data.response[0]);
      } catch (error) {
        console.error("Error fetching tutorial content:", error);
        setTutorialContent(
          "Failed to load tutorial content. Please try refreshing the page."
        );
      }
    };

    fetchTutorialContent();
  }, []);

  if (!tutorial) {
    return <div>Tutorial not found</div>;
  }

  const handleTaskProgress = (taskType: string) => {
    setTasks((prev) =>
      prev.map((levelTasks, levelIndex) =>
        levelIndex === currentLevel
          ? levelTasks.map((task) =>
              task.type === taskType ? { ...task, completed: true } : task
            )
          : levelTasks
      )
    );

    const updatedTasks = tasks.map((levelTasks, levelIndex) =>
      levelIndex === currentLevel
        ? levelTasks.map((task) =>
            task.type === taskType ? { ...task, completed: true } : task
          )
        : levelTasks
    );

    if (updatedTasks[currentLevel].every((task) => task.completed)) {
      if (currentLevel < tutorial.levels.length - 1) {
        setUnlockedLevels((prev) => 
          prev.includes(currentLevel + 1) ? prev : [...prev, currentLevel + 1]
        );
      }
    }
  };

  const handleSubmitTasks = async () => {
    const allLevelsCompleted = tasks.every((levelTasks) =>
      levelTasks.every((task) => task.completed)
    );

    if (allLevelsCompleted) {
      handleNFTMint();
      alert("Congratulations! You've completed all levels. NFT will be minted.");
      setIsNFTMinted(true);
    } else {
      alert("Please complete all levels first!");
    }
  };

  const handleNextTutorial = () => {
    const nextTutorialId = Number.parseInt(params.id) + 1;
    console.log("nextTutorialId",tutorials[nextTutorialId as keyof typeof tutorials]);
    if (tutorials[nextTutorialId as keyof typeof tutorials]) {
      router.push(`/tutorial/${nextTutorialId}`); 
    } else {
      router.push(`/tutorials`); // or wherever you want to redirect when there are no more tutorials 
    }
  };

  // Add this function to handle API calls
  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://autonome.alt.technology/agent-cwvvsu/chat",
        { message },
        {
          auth: {
            username: process.env.NEXT_PUBLIC_AI_AGENT_USERNAME!,
            password: process.env.NEXT_PUBLIC_AI_AGENT_PASSWORD!,
          },
        }
      );

      const aiResponse = response.data.response[0];

      setMessages((prev) => [
        ...prev,
        { content: message, role: "user" },
        { content: aiResponse, role: "assistant" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    await sendMessage(inputMessage);
    setInputMessage("");
  };

  const nftContractAddress = "0x3A4E0C505567EC24da054694b5c5312a88c3922e";
  const destinationWallet = "0x136D80a50d336B378B4D10D3c2312eD192bDeeE5";

  const handleNFTMint = async () => {
    const response = await axios.post(
      "https://autonome.alt.technology/agent-nggqoy/chat",
      {
        message: `nft contract: ${nftContractAddress}, destination wallet: ${destinationWallet}, Mint NFT to This Address`,
      },
      {
        auth: {
          username: process.env.NEXT_PUBLIC_AI_AGENT_USERNAME!,
          password: process.env.NEXT_PUBLIC_AI_AGENT_PASSWORD!,
        },
      }
    );
    alert(response.data.response[0] + "NFT Minted ✨");
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen mt-16">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Left Panel - Tutorial Content */}
        <div className="relative">
          <div className="bg-muted/5 rounded-lg p-6 border border-primary/10 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {tutorial.title}
            </h1>
            <div className="prose prose-invert max-w-none mb-8">
              {tutorialContent ? (
                <div className="whitespace-pre-wrap">{tutorialContent}</div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-primary/50 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-primary/50 rounded-full animate-bounce delay-100" />
                    <div className="w-3 h-3 bg-primary/50 rounded-full animate-bounce delay-200" />
                    <div className="w-3 h-3 bg-primary/50 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Button */}
          <div className="absolute bottom-4 left-4">
            <Button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="rounded-full p-4"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>

          {/* Chat Window */}
          {isChatOpen && (
            <div className="absolute bottom-20 left-4 w-96 h-96 bg-black/80 rounded-lg border border-primary/10 p-4 backdrop-blur-sm">
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`
                        flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }
                      `}
                    >
                      <div
                        className={`
                          max-w-[80%] p-3 rounded-lg
                          ${
                            message.role === "user"
                              ? "bg-primary/20 ml-auto"
                              : "bg-muted/20"
                          }
                        `}
                      >
                        <div className="prose prose-invert text-sm">
                          {message.content}
                        </div>handleSubmitTasks
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted/20 p-3 rounded-lg">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSendMessage} className="mt-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask about Uniswap..."
                      className="w-full p-2 pr-12 rounded-lg bg-muted/20 border border-primary/20 focus:outline-none focus:border-primary/50 transition-colors"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-1 top-1 h-8 w-8 p-0 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                      </svg>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Tasks and Mock Interface */}
        <div className="flex flex-col h-full">
          <Tabs
            value={currentLevel.toString()}
            onValueChange={(value) => {
              if (unlockedLevels.includes(Number(value))) {
                setCurrentLevel(Number(value));
              }
            }}
            className="w-full"
          >
            <TabsList className="w-full justify-start mb-4">
              {tutorial.levels.map((level, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  disabled={!unlockedLevels.includes(index)}
                  className="relative"
                >
                  {level.title}
                  {!unlockedLevels.includes(index) ? (
                    <Lock className="w-3 h-3 ml-2" />
                  ) : (
                    <Unlock className="w-3 h-3 ml-2" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {tutorial.levels.map((level, levelIndex) => (
              <TabsContent key={levelIndex} value={levelIndex.toString()}>
                {/* Tasks Section */}
                <div className="bg-gradient-to-br from-muted/10 via-primary/5 to-muted/10 rounded-lg p-6 border border-primary/20 mb-4">
                  <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {level.title} Tasks:
                  </h2>
                  <ul className="space-y-4">
                    {tasks[levelIndex].map((task, taskIndex) => (
                      <li
                        key={taskIndex}
                        className={`relative flex items-center gap-4 p-3 rounded-lg transition-all duration-300
                          ${task.completed ? "bg-primary/10 border-primary/30" : "bg-muted/5 border-muted/20"}
                          border backdrop-blur-sm hover:scale-[1.02]`}
                      >
                        <div
                          className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center
                            transition-all duration-300
                            ${
                              task.completed
                                ? "border-primary bg-primary/20"
                                : "border-muted/40 bg-muted/10"
                            }
                          `}
                        >
                          {task.completed && (
                            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                        <span
                          className={`
                          font-medium
                          ${
                            task.completed
                              ? "text-primary/70 line-through"
                              : "text-foreground"
                          }
                        `}
                        >
                          {task.text}
                        </span>
                        {task.completed && (
                          <span className="absolute right-3 text-xs text-primary/70">
                            Completed ✓
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mock Interface Section */}
                <div className="flex-1 bg-muted/10 rounded-lg p-6 border border-primary/10">
                  {tutorial.title === "Understanding Uniswap" && (
                    <MockUniswapInterface 
                      onTaskProgress={handleTaskProgress}
                      level={levelIndex}
                    />
                  )}
                  {tutorial.title === "Understanding Dao" && (
                    <MockDaoInterface 
                      onTaskProgress={handleTaskProgress}
                      level={levelIndex}
                    />
                  )}
                  {tutorial.title === "Understanding Yield Farming" && (
                    <MockYieldFarmingInterface 
                      onTaskProgress={handleTaskProgress}
                      level={levelIndex}
                    />
                  )}
                  {tutorial.title === "Understanding Flash Loans" && (
                    <MockFlashLoansInterface
                      onTaskProgress={handleTaskProgress}
                      level={currentLevel}
                      onLevelComplete={() => {
                        if (currentLevel < tutorial.levels.length - 1) {
                          setCurrentLevel(currentLevel + 1);
                          setUnlockedLevels(prev => [...prev, currentLevel + 1]);
                        }
                      }}
                      currentTasks={tasks[currentLevel] || []}
                    />
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* NFT Claim and Next Tutorial Buttons */}
          <div className="mt-4 space-y-3">
            <Button
              onClick={handleNFTMint}
              className={`w-full relative overflow-hidden transition-all duration-300
                ${tasks.every((levelTasks) => levelTasks.every((task) => task.completed))
                  ? "bg-gradient-to-r from-primary to-accent"
                  : "bg-muted/20"}`}
              disabled={!tasks.every((levelTasks) => levelTasks.every((task) => task.completed)) || isNFTMinted}
            >
              {isNFTMinted ? (
                "NFT Minted ✨"
              ) : tasks.every((levelTasks) => levelTasks.every((task) => task.completed)) ? (
                <>
                  <span className="relative z-10">
                    Claim Your NFT Achievement
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 animate-pulse" />
                </>
              ) : (
                "Complete All Levels to Claim NFT"
              )}
            </Button>

            {isNFTMinted && (
              <Button
                onClick={handleNextTutorial}
                className="w-full bg-gradient-to-r from-accent to-primary"
              >
                Continue to Next Tutorial →
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}