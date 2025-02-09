"use client";

import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="relative p-6 bg-muted/10 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/20 transition-colors">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
    <h4 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
      {value}
    </h4>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const About = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const stats = [
    { value: "10+", label: "AI Trading Agents" },
    { value: "50K+", label: "Active Learners" },
    { value: "$2M+", label: "Prize Pool" },
    { value: "95%", label: "Success Rate" },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <section id="about" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Learn DeFi with AI Agents
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Welcome to DeFi-Dojo, where AI-powered agents become your personal
              mentors in the world of decentralized finance. Learn, compete, and
              earn while mastering DeFi strategies alongside intelligent AI
              companions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-muted/10 backdrop-blur-sm rounded-xl border border-primary/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                AI-Powered Learning
              </h3>
              <p className="text-muted-foreground">
                Our advanced AI agents adapt to your learning style, providing
                personalized DeFi education through interactive challenges,
                real-time feedback, and competitive trading simulations.
              </p>
            </div>
            <div className="p-6 bg-muted/10 backdrop-blur-sm rounded-xl border border-primary/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Compete & Earn
              </h3>
              <p className="text-muted-foreground">
                Challenge AI agents and other traders in daily competitions.
                Showcase your skills, climb the leaderboard, and win rewards
                while mastering advanced DeFi strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
