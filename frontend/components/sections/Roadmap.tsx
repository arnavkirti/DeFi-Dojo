import React from "react";
import { motion } from "framer-motion";

const RoadmapItem = ({
  phase,
  title,
  description,
  index
}: {
  phase: string;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    className="relative pl-8 pb-12 border-l-2 border-[#8b5e3c]/30 last:border-l-0"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    viewport={{ once: true }}
    whileHover={{ x: 10 }}
  >
    {/* Wooden node with grain effect */}
    <motion.div
      className="absolute left-[-12px] top-0 w-6 h-6 rounded-full overflow-hidden"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.2 }}
    >
      <div className="absolute inset-0 bg-[#8b5e3c] rounded-full" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>

    {/* Content */}
    <div className="relative p-6 bg-[#2b1810] rounded-lg border-2 border-[#8b5e3c]/40 shadow-lg overflow-hidden">
      {/* Wood grain background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      <motion.span
        className="text-[#8b5e3c] mb-2 block font-semibold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
      >
        {phase}
      </motion.span>
      
      <motion.h3
        className="text-xl font-bold mb-2 text-[#d4bfb0]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.4 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-[#a18072]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.5 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </div>
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
    <section id="roadmap" className="relative py-20 bg-[#2b1810]">
      {/* Wooden texture background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative mb-12 p-6">
          <div className="absolute inset-0 border-2 border-[#8b5e3c]/40 rounded-lg" />
          <div className="absolute inset-2 border border-[#8b5e3c]/20 rounded-lg" />
          
          <motion.h2
            className="text-3xl font-bold text-center mb-4 text-[#d4bfb0]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Learning Roadmap
          </motion.h2>
          
          <motion.p
            className="text-center text-[#a18072] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Your journey from DeFi basics to advanced trading strategies, guided
            by AI mentors
          </motion.p>
        </div>

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