"use client";

import React, { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import MockUniswapInterface from "@/components/MockUniswapInterface";
import axios from "axios";

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
};

// Add these new types
type Message = {
  content: string;
  role: "user" | "assistant";
};

export default function TutorialPage({ params }: { params: { id: string } }) {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const tutorial = tutorials[Number(params.id) as keyof typeof tutorials];
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNFTMinted, setIsNFTMinted] = useState(false);
  const [tasks, setTasks] = useState(
    tutorial?.tasks.map((task) => ({ ...task, completed: false })) || []
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tutorialContent, setTutorialContent] = useState("");

  React.useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  React.useEffect(() => {
    if (authenticated) {
      setTasks((prev) =>
        prev.map((task) =>
          task.type === "CONNECT_WALLET" ? { ...task, completed: true } : task
        )
      );
    }
  }, [authenticated]);

  // Add this effect to fetch tutorial content on mount
  React.useEffect(() => {
    const fetchTutorialContent = async () => {
      try {
        const response = await axios.post(
          "https://autonome.alt.technology/agent-eqtrhs/chat",
          {
            message:
              "Explain how Uniswap's automated market maker (AMM) works, focusing on its liquidity pools, token swaps, and the concept of impermanent loss. Provide an in-depth example of a trade execution on Uniswap.",
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
      prev.map((task) =>
        task.type === taskType ? { ...task, completed: true } : task
      )
    );
  };

  const handleSubmitTasks = async () => {
    if (tasks.every((task) => task.completed)) {
      // Add NFT minting logic here
      alert("Congratulations! You've completed all tasks. NFT will be minted.");
      setIsNFTMinted(true);
    } else {
      alert("Please complete all tasks first!");
    }
  };

  const handleNextTutorial = () => {
    const nextTutorialId = Number(params.id) + 1;
    if (tutorials[nextTutorialId as keyof typeof tutorials]) {
      router.push(`/tutorial/${nextTutorialId}`);
    } else {
      router.push("/tutorials"); // or wherever you want to redirect when there are no more tutorials
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

        {/* Right Panel - Tasks and Mock Interface */}
        <div className="flex flex-col h-full">
          {/* Tasks Section */}
          <div className="bg-gradient-to-br from-muted/10 via-primary/5 to-muted/10 rounded-lg p-6 border border-primary/20 mb-4 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tasks to Complete:
            </h2>
            <ul className="space-y-4">
              {tasks.map((task, index) => (
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
                    hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5
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
            <div className="space-y-3">
              <Button
                onClick={handleSubmitTasks}
                className={`
                  w-full relative overflow-hidden
                  transition-all duration-300
                  ${
                    tasks.every((task) => task.completed)
                      ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20"
                      : "bg-muted/20"
                  }
                `}
                disabled={!tasks.every((task) => task.completed) || isNFTMinted}
              >
                {isNFTMinted ? (
                  "NFT Minted ✨"
                ) : tasks.every((task) => task.completed) ? (
                  <>
                    <span className="relative z-10">
                      Claim Your NFT Achievement
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 animate-pulse" />
                  </>
                ) : (
                  "Complete All Tasks to Claim NFT"
                )}
              </Button>

              {isNFTMinted && (
                <Button
                  onClick={handleNextTutorial}
                  className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                >
                  Continue to Next Tutorial →
                </Button>
              )}
            </div>
          </div>

          {/* Mock Uniswap Interface */}
          <div className="flex-1 bg-muted/10 rounded-lg p-6 border border-primary/10">
            <MockUniswapInterface onTaskProgress={handleTaskProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}
