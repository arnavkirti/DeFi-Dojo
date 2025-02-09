import React from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";

const WoodenButton = ({
  children,
  variant = "default",
  size,
  onClick,
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: string;
  onClick?: () => void;
  className?: string;
  props?: any;
}) => (
  <Button
    {...props}
    className={`relative overflow-hidden ${className} ${
      variant === "outline"
        ? "border-[#8b5e3c] bg-[#2b1810] text-[#d4bfb0] hover:bg-[#3d2315]"
        : "bg-[#8b5e3c] text-[#d4bfb0] hover:bg-[#7a5033]"
    } rounded-lg shadow-lg transform transition-all duration-200`}
  >
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
    {children}
  </Button>
);

const Hero = () => {
  const router = useRouter();
  const { login, authenticated } = usePrivy();
  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleGetStarted = () => {
    if (!authenticated) {
      login();
    } else {
      router.push("/tutorial/1");
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden bg-[#2b1810]">
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

      {/* Japanese-style decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full border-2 border-[#8b5e3c]/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Japanese-style frame */}
            <div className="relative mb-8 p-6">
              <div className="absolute inset-0 border-2 border-[#8b5e3c]/40 rounded-lg" />
              <div className="absolute inset-2 border border-[#8b5e3c]/20 rounded-lg" />
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 text-[#d4bfb0]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Welcome to DeFi-Dojo
              </motion.h1>
            </div>
            <motion.p
              className="text-xl mb-8 text-[#a18072]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Discover the world of decentralized finance with our comprehensive
              platform.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <WoodenButton size="lg" onClick={handleGetStarted}>
                Get Started
                <FiArrowRight className="w-4 h-4 ml-2" />
              </WoodenButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <WoodenButton
                size="lg"
                variant="outline"
                onClick={() => router.push("/#features")}
              >
                Learn More
                <FiChevronDown className="w-4 h-4 ml-2" />
              </WoodenButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-[-200px] left-1/2 transform -translate-x-1/2 mt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
          >
            <WoodenButton
              variant="ghost"
              size="sm"
              onClick={scrollToFeatures}
              className="text-[#a18072] hover:text-[#d4bfb0]"
            >
              <FiChevronDown className="w-6 h-6" />
            </WoodenButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
