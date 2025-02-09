import React from "react";
import { motion } from "framer-motion";

const RoadmapItem = ({
  phase,
  title,
  description,
  index,
}: {
  phase: string;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    className="relative pl-8 pb-12 border-l-2 border-primary/30 last:border-l-0"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    viewport={{ once: true }}
    whileHover={{ x: 10 }}
  >
    <motion.div
      className="absolute left-[-8px] top-0 w-4 h-4 bg-primary rounded-full"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.2 }}
    />
    <motion.span
      className="text-primary mb-2 block"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.2 + 0.3 }}
      viewport={{ once: true }}
    >
      {phase}
    </motion.span>
    <motion.h3
      className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.2 + 0.4 }}
      viewport={{ once: true }}
    >
      {title}
    </motion.h3>
    <motion.p
      className="text-muted-foreground"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.2 + 0.5 }}
      viewport={{ once: true }}
    >
      {description}
    </motion.p>
  </motion.div>
);

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1 - Current",
      title: "DeFi Fundamentals & Uniswap",
      description:
        "Interactive tutorials on DeFi basics, Uniswap mechanics, and liquidity provision. Hands-on experience with AI-guided trading simulations.",
    },
    {
      phase: "Phase 2 - Q2 2024",
      title: "Advanced DEX Strategies",
      description:
        "Deep dive into arbitrage, impermanent loss management, and multi-pool strategies. Introduction of competitive trading challenges with AI mentors.",
    },
    {
      phase: "Phase 3 - Q3 2024",
      title: "Yield Farming & Lending",
      description:
        "Comprehensive modules on yield optimization, lending protocols, and risk management. Launch of personalized AI strategy advisors.",
    },
    {
      phase: "Phase 4 - Q4 2024",
      title: "Cross-Chain DeFi",
      description:
        "Exploration of cross-chain bridges, multi-chain yield strategies, and advanced portfolio management with AI-powered analytics.",
    },
    {
      phase: "Phase 5 - Q1 2025",
      title: "DeFi Innovation Hub",
      description:
        "Introduction to DeFi protocol development, governance participation, and advanced trading algorithms. Launch of community-driven learning initiatives.",
    },
  ];

  return (
    <section id="roadmap" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Learning Roadmap
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Your journey from DeFi basics to advanced trading strategies, guided
          by AI mentors
        </motion.p>
        <div className="max-w-3xl mx-auto">
          {roadmapItems.map((item, index) => (
            <RoadmapItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
