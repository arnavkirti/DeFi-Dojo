"use client";

import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import Roadmap from "@/components/sections/Roadmap";
import Community from "@/components/sections/Community";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <About />
      <Roadmap />
      <Community />
    </div>
  );
}
