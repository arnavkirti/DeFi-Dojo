"use client";

import React, { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import MockUniswapInterface from "@/components/MockUniswapInterface";
import axios from "axios";

// Add this type at the top with other types
type Message = {
  content: string;
  role: "user" | "assistant";
};

// Add this type at the top with other types
type Tutorial = {
  title: string;
  description: string;
  content: string;
  levels?: {
    title: string;
    description: string;
    tasks: { text: string; type: string; completed: boolean }[];
  }[];
  textForAI: string;
};

// Update the tutorials object type
const tutorials: Record<number, Tutorial> = {
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
    levels: [
      {
        title: "Level 1",
        description: "",
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
        ],
      },
    ],
    textForAI:
      "Explain how Uniswap's automated market maker (AMM) works, focusing on its liquidity pools, token swaps, and the concept of impermanent loss. Provide an in-depth example of a trade execution on Uniswap.",
  },
  2: {
    title: "Understanding Dao",
    description: "Learn the basics of DAOs and how they work.",
    content: `
      DAOs (Decentralized Autonomous Organizations) are innovative organizational structures
      that leverage blockchain technology to enable collective decision-making without centralized leadership.
      In a DAO, community members can propose, debate, and vote on decisions that affect the entire organization.
      This model promotes transparency, inclusivity, and community governance.
    `,
    levels: [
      {
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
      },
    ],

    textForAI:
      "Explain how Decentralized Autonomous Organizations (DAOs) work, focusing on the principles of decentralized governance, the proposal and voting mechanisms, token-based decision making, and how community consensus is achieved. Provide an in-depth example of how a proposal is submitted, debated, and executed within a DAO.",
  },
  3: {
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
        description:
          "Learn the fundamentals of providing liquidity to a DeFi protocol.",
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
        description:
          "Understand how to use your crypto as collateral to borrow assets.",
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
        description:
          "Explore how lending your crypto can generate passive income.",
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
        description:
          "Learn how staking your tokens can yield additional rewards.",
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
        description:
          "Understand the long-term strategy of holding assets for passive yield and risk management.",
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
    textForAI:
      "Explain how yield farming works, focusing on the different types of yield farming strategies, the benefits of participating in yield farming, and the risks associated with it.",
  },
  4: {
    title: "Understanding Flash Loans",
    description: "Learn the basics of Flash Loans and how they work.",
    content: `
      Flash loans are a type of DeFi loan that allows users to borrow assets without collateral.
      They are typically used for arbitrage opportunities or to quickly respond to market conditions.
    `,
    textForAI:
      "Explain how flash loans work in DeFi, including their use cases, benefits, risks, and how they are executed within a single transaction block.",
  },
};

const TutorialPage = ({ params }: { params: { id: string } }) => {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const tutorial = tutorials[Number(params.id) as keyof typeof tutorials];
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNFTMinted, setIsNFTMinted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [levels, setLevels] = useState<
    {
      title: string;
      description: string;
      tasks: { text: string; completed: boolean; type: string }[];
    }[]
  >(
    tutorial?.levels?.map((level) => ({
      ...level,
      tasks: level.tasks.map((task) => ({ ...task, completed: false })),
    })) || []
  );
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  React.useEffect(() => {
    if (authenticated) {
      setLevels(
        (
          prev: {
            title: string;
            description: string;
            tasks: { text: string; completed: boolean; type: string }[];
          }[]
        ) =>
          prev.map(
            (
              level: {
                title: string;
                description: string;
                tasks: { text: string; completed: boolean; type: string }[];
              },
              idx
            ) =>
              idx === currentLevel
                ? {
                    ...level,
                    tasks: level.tasks.map((task) =>
                      task.type === "CONNECT_WALLET"
                        ? { ...task, completed: true }
                        : task
                    ),
                  }
                : level
          )
      );
    }
  }, [authenticated, currentLevel]);

  React.useEffect(() => {
    const newProgress = calculateTutorialProgress();
    setProgress(newProgress);
  }, [levels]);

  const handleTaskProgress = (taskType: string) => {
    setLevels((prev) =>
      prev.map((level, idx) =>
        idx === currentLevel
          ? {
              ...level,
              tasks: level.tasks.map((task) =>
                task.type === taskType ? { ...task, completed: true } : task
              ),
            }
          : level
      )
    );
  };

  const isCurrentLevelComplete = () => {
    const currentLevelTasks = levels[currentLevel]?.tasks;
    return currentLevelTasks?.every((task) => task.completed) ?? false;
  };

  const isLastLevel = () => {
    return currentLevel === levels.length - 1;
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel((prev) => prev + 1);
    }
  };

  const handleMintNFT = async () => {
    if (isCurrentLevelComplete()) {
      try {
        // Add your NFT minting logic here
        setIsNFTMinted(true);
        alert(
          "Congratulations! NFT has been minted for completing the tutorial!"
        );
      } catch (error) {
        console.error("Error minting NFT:", error);
        alert("Failed to mint NFT. Please try again.");
      }
    }
  };

  const handleNextTutorial = () => {
    const nextTutorialId = Number(params.id) + 1;
    if (tutorials[nextTutorialId as keyof typeof tutorials]) {
      router.push(`/tutorial/${nextTutorialId}`);
    } else {
      router.push("/tutorials");
    }
  };

  // Add this function to handle API calls
  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        "https://autonome.alt.technology/agent-eqtrhs/chat",
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

  const calculateTutorialProgress = () => {
    if (!levels.length) return 0;

    let completedTasks = 0;
    let totalTasks = 0;

    levels.forEach((level) => {
      level.tasks.forEach((task) => {
        if (task.completed) completedTasks++;
        totalTasks++;
      });
    });

    return (completedTasks / totalTasks) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen mt-16">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Left Panel - Tutorial Content */}
        <div className="relative">
          <div className="bg-muted/5 rounded-lg p-6 border border-primary/10 h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {tutorial.title} - {levels[currentLevel]?.title}
            </h1>
            <div className="prose prose-invert max-w-none mb-8">
              <div className="whitespace-pre-wrap">
                {levels[currentLevel]?.description || tutorial.content}
              </div>
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
                        </div>
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

        {/* Right Panel - Modified for Tutorial Progress */}
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-br from-muted/10 via-primary/5 to-muted/10 rounded-lg p-6 border border-primary/20 mb-4 backdrop-blur-sm">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Tutorial {params.id} - {tutorial.title}
                </h2>
                <span className="text-sm text-muted-foreground">
                  Level {currentLevel + 1} of {levels.length}
                </span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Progress: {Math.round(progress)}%</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>

            {/* Current Level Tasks */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Level {currentLevel + 1}: {levels[currentLevel]?.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {levels[currentLevel]?.description}
              </p>

              {/* Only show tasks for current level */}
              <ul className="space-y-4">
                {levels[currentLevel]?.tasks.map((task, index) => (
                  <li
                    key={index}
                    className={`
                      relative flex items-center gap-4 p-3 
                      rounded-lg transition-all duration-300
                      ${
                        task.completed
                          ? "bg-primary/10 border-primary/30"
                          : "bg-muted/5 border-muted/20"
                      } 
                      border backdrop-blur-sm
                    `}
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
                      className={
                        task.completed
                          ? "text-primary/70 line-through"
                          : "text-foreground"
                      }
                    >
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Navigation Buttons */}
              <div className="space-y-3 mt-4">
                {isCurrentLevelComplete() && !isLastLevel() && (
                  <Button
                    onClick={handleNextLevel}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Continue to Level {currentLevel + 2}
                  </Button>
                )}

                {isCurrentLevelComplete() && isLastLevel() && !isNFTMinted && (
                  <Button
                    onClick={handleMintNFT}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Mint Tutorial Completion NFT
                  </Button>
                )}

                {isNFTMinted && (
                  <Button
                    onClick={handleNextTutorial}
                    className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90"
                  >
                    Start Next Tutorial →
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Mock Interface */}
          <div className="flex-1 bg-muted/10 rounded-lg p-6 border border-primary/10">
            <MockUniswapInterface onTaskProgress={handleTaskProgress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
