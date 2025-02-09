import React from "react";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WoodenCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
    {children}
  </div>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <WoodenCard className="p-6 bg-[#2b1810] rounded-lg border-2 border-[#8b5e3c] shadow-lg">
    <h4 className="text-3xl font-bold text-[#d4bfb0] mb-2">{value}</h4>
    <p className="text-sm text-[#a18072]">{label}</p>
  </WoodenCard>
);

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, -150]);

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
    <section id="about" className="relative py-20 bg-[#2b1810]">
      {/* Wooden texture background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated wood grain lines */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-1 bg-gradient-to-b from-transparent via-[#8b5e3c]/20 to-transparent"
            style={{ left: `${i * 20}%` }}
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mb-8 p-6">
              <div className="absolute inset-0 border-2 border-[#8b5e3c]/40 rounded-lg" />
              <div className="absolute inset-2 border border-[#8b5e3c]/20 rounded-lg" />
              <h2 className="text-3xl font-bold mb-4 text-[#d4bfb0]">
                Learn DeFi with AI Agents
              </h2>
              <p className="text-[#a18072] text-lg">
                Welcome to DeFi-Dojo, where AI-powered agents become your
                personal mentors in the world of decentralized finance. Learn,
                compete, and earn while mastering DeFi strategies alongside
                intelligent AI companions.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="transform transition-all duration-200"
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI-Powered Learning",
                content:
                  "Our advanced AI agents adapt to your learning style, providing personalized DeFi education through interactive challenges, real-time feedback, and competitive trading simulations.",
              },
              {
                title: "Compete & Earn",
                content:
                  "Challenge AI agents and other traders in daily competitions. Showcase your skills, climb the leaderboard, and win rewards while mastering advanced DeFi strategies.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <WoodenCard className="p-6 bg-[#2b1810] rounded-lg border-2 border-[#8b5e3c] shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-[#d4bfb0]">
                    {item.title}
                  </h3>
                  <p className="text-[#a18072]">{item.content}</p>
                </WoodenCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
