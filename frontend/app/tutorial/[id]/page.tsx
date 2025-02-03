"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
      "Read about how Uniswap's AMM works",
      "Understand the concept of liquidity pools",
      "Learn about impermanent loss",
    ],
  },
};

export default function TutorialPage({ params }: { params: { id: string } }) {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const tutorial = tutorials[Number(params.id) as keyof typeof tutorials];

  React.useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  if (!tutorial) {
    return <div>Tutorial not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          {tutorial.title}
        </h1>
        <p className="text-xl mb-8 text-muted-foreground">
          {tutorial.description}
        </p>

        <div className="prose prose-invert max-w-none mb-8">
          <p>{tutorial.content}</p>
        </div>

        <div className="bg-muted/10 rounded-lg p-6 border border-primary/10">
          <h2 className="text-xl font-semibold mb-4">Tasks to Complete:</h2>
          <ul className="space-y-3">
            {tutorial.tasks.map((task, index) => (
              <li key={index} className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button>Next Tutorial</Button>
        </div>
      </div>
    </div>
  );
}
