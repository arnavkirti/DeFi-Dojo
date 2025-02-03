import React from "react";

const RoadmapItem = ({
  phase,
  title,
  description,
}: {
  phase: string;
  title: string;
  description: string;
}) => (
  <div className="relative pl-8 pb-12 border-l-2 border-primary/30 last:border-l-0">
    <div className="absolute left-[-8px] top-0 w-4 h-4 bg-primary rounded-full" />
    <span className="text-primary mb-2 block">{phase}</span>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1 - Q2 2024",
      title: "AI Agents Launch",
      description:
        "Release of first-generation AI trading mentors and basic learning modules",
    },
    {
      phase: "Phase 2 - Q3 2024",
      title: "Advanced Training",
      description:
        "Introduction of competitive trading simulations and advanced AI strategies",
    },
    {
      phase: "Phase 3 - Q4 2024",
      title: "Community Features",
      description:
        "Launch of peer-to-peer learning and AI agent customization options",
    },
    {
      phase: "Phase 4 - Q1 2025",
      title: "Enhanced AI",
      description:
        "Advanced AI capabilities with multi-chain support and specialized trading agents",
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Roadmap</h2>
        <div className="max-w-3xl mx-auto">
          {roadmapItems.map((item, index) => (
            <RoadmapItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
