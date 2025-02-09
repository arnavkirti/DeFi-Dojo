import React from "react";
import { FiBox, FiBookOpen, FiAward, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

const WoodenCard = ({ children, index }: { children: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="relative p-6 rounded-xl transition-all duration-300 group"
  >
    {/* Wooden texture background */}
    <div className="absolute inset-0 rounded-xl bg-[#3d2315] opacity-80" />
    
    {/* Wood grain overlay */}
    <div 
      className="absolute inset-0 rounded-xl opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
      }}
    />
    
    {/* Border frame */}
    <div className="absolute inset-0 rounded-xl border-2 border-[#8b5e3c]/30 group-hover:border-[#8b5e3c]/50 transition-colors" />
    <div className="absolute inset-[3px] rounded-lg border border-[#8b5e3c]/20 group-hover:border-[#8b5e3c]/30 transition-colors" />
    
    {/* Inner shadow */}
    <div className="absolute inset-0 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" />
    
    {/* Content container */}
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: any;
  title: string;
  description: string;
  index: number;
}) => (
  <WoodenCard index={index}>
    <div className="relative">
      {/* Icon with wooden background circle */}
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full bg-[#8b5e3c]/20" />
        <Icon className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#d4bfb0]" />
      </div>
      
      {/* Title with decorative underline */}
      <h3 className="text-xl font-bold mb-2 text-[#d4bfb0] relative">
        {title}
        <div className="absolute -bottom-1 left-0 w-12 h-[2px] bg-[#8b5e3c]/40" />
      </h3>
      
      <p className="text-[#a18072]">{description}</p>
    </div>
  </WoodenCard>
);

const Features = () => {
  const features = [
    {
      icon: FiBox,
      title: "AI Trading Mentors",
      description:
        "Learn from personalized AI agents that adapt to your trading style and knowledge level",
    },
    {
      icon: FiBookOpen,
      title: "Smart Learning Path",
      description:
        "Customized DeFi education journey with interactive challenges and real-time feedback",
    },
    {
      icon: FiAward,
      title: "Compete & Earn",
      description:
        "Challenge AI agents in trading competitions and earn rewards while learning",
    },
    {
      icon: FiTrendingUp,
      title: "Performance Analytics",
      description:
        "Track your progress and compare strategies with AI-powered insights",
    },
  ];

  return (
    <section id="features" className="relative py-20">
      {/* Wooden background */}
      <div className="absolute inset-0 bg-[#2b1810]" />
      
      {/* Wooden texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title with wooden frame */}
        <div className="relative max-w-3xl mx-auto mb-12">
          <div className="absolute inset-0 -m-6 border-2 border-[#8b5e3c]/30 rounded-xl" />
          <div className="absolute inset-0 -m-6 border border-[#8b5e3c]/20 rounded-xl transform translate-y-1" />
          
          <motion.h2
            className="text-3xl font-bold text-center mb-4 text-[#d4bfb0]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Learn DeFi with AI
          </motion.h2>
          
          <motion.p
            className="text-[#a18072] text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the future of DeFi education through our innovative
            AI-powered learning platform
          </motion.p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;