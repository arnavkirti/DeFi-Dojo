import React from "react";
import { FiBox, FiBookOpen, FiAward, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";

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
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="relative p-6 bg-muted/10 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/20 transition-colors"
  >
    <Icon className="w-8 h-8 mb-4 text-primary" />
    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
      {title}
    </h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Learn DeFi with AI
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Experience the future of DeFi education through our innovative
          AI-powered learning platform
        </motion.p>
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
