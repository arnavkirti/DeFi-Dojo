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
import { useAppStore } from "@/store/store";
import { tutorials } from "./tutorial";
import { InitialMessage } from "./InitialMessage";
import { ethers } from "ethers";
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
    tutorial?.levels.map((level) =>
      level.tasks.map((task) => ({ ...task, completed: false }))
    ) || []
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tutorialContent, setTutorialContent] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([0]);
  const { initialMessage, setInitialMessage } = useAppStore();
  const [isInitialMessageLoading, setIsInitialMessageLoading] = useState(true);

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
          process.env.NEXT_PUBLIC_AI_AGENT_URL!,
          {
            message: `${tutorial.levels[0].tasks[0].AiPrompt}`,
          },
          {
            auth: {
              username: process.env.NEXT_PUBLIC_AI_AGENT_USERNAME!,
              password: process.env.NEXT_PUBLIC_AI_AGENT_PASSWORD!,
            },
          }
        );
        setIsInitialMessageLoading(false);

        setInitialMessage(response.data.response[0]);
      } catch (error) {
        console.error("Error fetching tutorial content:", error);
        setInitialMessage(
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
      await handleNFTmint();
      alert(
        "Congratulations! You've completed all levels. NFT will be minted."
      );
      setIsNFTMinted(true);
    } else {
      alert("Please complete all levels first!");
    }
  };

  const handleNextTutorial = () => {
    const nextTutorialId = Number.parseInt(params.id) + 1;
    console.log(
      "nextTutorialId",
      tutorials[nextTutorialId as keyof typeof tutorials]
    );
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
        process.env.NEXT_PUBLIC_AI_AGENT_URL!,
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

  const handleNFTmint = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const response = await axios.post(
      process.env.NEXT_PUBLIC_AI_AGENT_URL!,
      {
        message: `Deploy an nft contract with:
        name: MileAchiever
        Symbol: MA 
        base url: https://launchpad.collectify.app/main/metadata/B2VW359XP 
        // mint this nft to 0x136D80a50d336B378B4D10D3c2312eD192bDeeE5`,
      },
      {
        auth: {
          username: process.env.NEXT_PUBLIC_AI_AGENT_USERNAME!,
          password: process.env.NEXT_PUBLIC_AI_AGENT_PASSWORD!,
        },
      }
    );
    console.log(response.data);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen mt-16">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Left Panel - Tutorial Content */}
        <div className="">
          <div className="bg-muted/5 rounded-lg pl-6 pr-6 pt-6  border border-primary/10 h-[90%] overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {tutorial.title}
            </h1>

            {/* Chat */}
            <div className="  overflow-y-scroll">
              <div className=" h-[900px] flex flex-col ">
                <div className="flex-1  space-y-4 mb-4">
                  {isInitialMessageLoading && (
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
                  <div className="flex justify-start">
                    <InitialMessage content={initialMessage} />
                  </div>

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
          </div>
        </div>

        {/* Right Panel - Tasks and Mock Interface */}
        <div className="flex flex-col h-full ">
          <Tabs
            value={currentLevel.toString()}
            onValueChange={(value) => {
              if (unlockedLevels.includes(Number(value))) {
                setCurrentLevel(Number(value));
              }
            }}
            className="w-full"
          >
            <TabsList className="w-full justify-between mb-4">
              {tutorial.levels.map((level, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  disabled={!unlockedLevels.includes(index)}
                  className={`relative w-full ${
                    !unlockedLevels.includes(index)
                      ? "text-red-500 bg-red-500/10"
                      : "text-green-500 bg-green-500/10"
                  }`}
                >
                  Level : {index + 1}
                  {!unlockedLevels.includes(index) ? (
                    <Lock className="w-3 h-3 ml-2 text-red-500" />
                  ) : (
                    <Unlock className="w-3 h-3 ml-2 text-green-500" />
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
                          ${
                            task.completed
                              ? "bg-primary/10 border-primary/30"
                              : "bg-muted/5 border-muted/20"
                          }
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
                      tutorial={tutorial}
                      level={levelIndex}
                    />
                  )}
                  {tutorial.title === "Understanding Dao" && (
                    <MockDaoInterface
                      onTaskProgress={handleTaskProgress}
                      tutorial={tutorial}
                      level={levelIndex}
                    />
                  )}
                  {tutorial.title === "Understanding Yield Farming" && (
                    <MockYieldFarmingInterface
                      onTaskProgress={handleTaskProgress}
                      tutorial={tutorial}
                      level={levelIndex}
                    />
                  )}
                  {tutorial.title === "Understanding Flash Loans" && (
                    <MockFlashLoansInterface
                      onTaskProgress={handleTaskProgress}
                      tutorial={tutorial}
                      level={currentLevel}
                      setIsInitialMessageLoading={setIsInitialMessageLoading}
                      onLevelComplete={() => {
                        if (currentLevel < tutorial.levels.length - 1) {
                          setCurrentLevel(currentLevel + 1);
                          setUnlockedLevels((prev) => [
                            ...prev,
                            currentLevel + 1,
                          ]);
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
              onClick={handleSubmitTasks}
              className={`w-full relative overflow-hidden transition-all duration-300
                ${
                  tasks.every((levelTasks) =>
                    levelTasks.every((task) => task.completed) 
                  )
                    ? "bg-gradient-to-r from-primary to-accent"
                    : "bg-muted/20"
                }`}
              disabled={
                !tasks.every((levelTasks) =>
                  levelTasks.every((task) => task.completed)
                ) || isNFTMinted
              }
            >
              {isNFTMinted ? (
                "NFT Minted ✨"
              ) : tasks.every((levelTasks) =>
                  levelTasks.every((task) => task.completed)
                ) ? (
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
